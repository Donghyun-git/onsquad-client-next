import dayjs from 'dayjs';
import { jwtDecode } from 'jwt-decode';
import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';

import { PATH } from '@/shared/config/paths';

import authConfig from './auth.config';
import { tokenRefreshGetFetch } from './shared/api/auth/tokenRefreshGetFetch';
import { userInfoGetFetch } from './shared/api/user/userInfoGetFetch';
import type { Mbti } from './shared/config';

async function refreshAccessToken(token: JWT): Promise<JWT> {
  // [DIAG] 사용하는 refresh token 의 jti (이중 refresh 추적용)
  const rtJti = (() => {
    try {
      return jwtDecode<{ jti?: string }>(token.refreshToken)?.jti;
    } catch {
      return 'decode-fail';
    }
  })();
  console.log('[DIAG refreshAccessToken] 시작 — refreshToken jti:', rtJti, '| runtime:', typeof window === 'undefined' ? 'server' : 'client');

  try {
    const res = await tokenRefreshGetFetch({
      refreshToken: token.refreshToken,
    });

    console.log('[DIAG refreshAccessToken] reissue 응답 status:', res.data?.status, '| error:', JSON.stringify(res.data?.error));

    if (res.data.status === 401) {
      throw new Error('RefreshAccessTokenError');
    }

    const newToken = res.data.data;

    console.log('[DIAG refreshAccessToken] 성공 — 새 RT jti:', (() => {
      try {
        return jwtDecode<{ jti?: string }>(newToken.refreshToken)?.jti;
      } catch {
        return '?';
      }
    })());

    return {
      ...token,
      accessToken: newToken.accessToken,
      refreshToken: newToken.refreshToken ?? token.refreshToken,
      // 갱신 후 만료시각은 새 액세스 토큰의 실제 exp 를 사용한다.
      // (하드코딩 20분으로 두면 실제 30초 만료 토큰을 jwt 콜백이 '유효'로 오판해 stale token 으로 T003 발생)
      accessTokenExpires: jwtDecode(newToken.accessToken)?.exp,
    };
  } catch (error) {
    console.error('[DIAG refreshAccessToken] 실패:', error instanceof Error ? error.message : error);

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user) {
        token = { ...user, ...token, accessTokenExpires: jwtDecode(user.accessToken)?.exp };

        return token;
      }

      const isValid = !!(token.accessTokenExpires && dayjs().isBefore(dayjs.unix(token.accessTokenExpires)));
      console.log(
        '[DIAG jwt] 호출 — accessTokenExpires:',
        token.accessTokenExpires,
        '| now:',
        dayjs().unix(),
        '| 유효?',
        isValid,
        '| trigger:',
        trigger,
      );

      if (isValid) {
        return token;
      }

      if (trigger === 'update') {
        const userInfoResponse = await userInfoGetFetch({
          accessToken: token.accessToken,
        });

        const newData = userInfoResponse.data.data;

        token = { ...token, ...newData };

        return token;
      }

      return await refreshAccessToken(token);
    },

    async session({ session, token }) {
      session.id = token.id as number;
      session.user.email = token.email;
      session.nickname = token.nickname;
      session.gender = token.gender;
      session.birth = token.birth;
      session.userType = token.userType;
      session.address = token.address;
      session.addressDetail = token.addressDetail;
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.mbti = token.mbti as Mbti | '';
      session.kakaoLink = token.kakaoLink as string;
      session.profileImage = token.profileImage as string;
      session.introduce = token.introduce as string;
      // refresh 실패(jwt 콜백의 refreshAccessToken)를 세션에 전파해 클라/미들웨어가 재로그인을 유도할 수 있게 한다.
      session.error = token.error;

      return session;
    },
  },

  session: {
    strategy: 'jwt',
  },

  secret: process.env.AUTH_SECRET,

  pages: {
    signIn: PATH.root,
    signOut: PATH.root,
  },
});
