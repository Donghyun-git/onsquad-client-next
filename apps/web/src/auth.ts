import dayjs from 'dayjs';
import { jwtDecode } from 'jwt-decode';
import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';

import { PATH } from '@/shared/config/paths';

import authConfig from './auth.config';
import { tokenRefreshGetFetch } from './shared/api/auth/tokenRefreshGetFetch';
import { userInfoGetFetch } from './entities/auth/api/userInfoGetFetch';
import type { Mbti } from './shared/config';

/**
 * refresh token 으로 백엔드에 토큰 재발급을 요청한다(서버 전용).
 * 자동(지연) 호출하지 않고, 클라이언트의 명시적 'token-refresh' update 트리거로만 1회 호출된다.
 */
async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const res = await tokenRefreshGetFetch({ refreshToken: token.refreshToken });
    const newToken = res.data.data;

    if (res.data.error || !newToken?.accessToken) {
      throw new Error('RefreshAccessTokenError');
    }

    return {
      ...token,
      accessToken: newToken.accessToken,
      refreshToken: newToken.refreshToken ?? token.refreshToken,
      accessTokenExpires: jwtDecode(newToken.accessToken)?.exp,
      error: undefined,
    };
  } catch {
    return { ...token, error: 'RefreshAccessTokenError' };
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token = { ...user, ...token, accessTokenExpires: jwtDecode(user.accessToken)?.exp };

        return token;
      }

      // 명시적 토큰 재발급 트리거: 클라이언트가 만료(T003)를 만나면 single-flight 로
      // update({ type: 'token-refresh' }) 를 1회 호출한다. 재발급은 서버(여기)에서만 일어나
      // refresh token 이 JS 에 노출되지 않고, /api/auth/session 응답으로 세션 쿠키가 네이티브 영속화된다.
      if (trigger === 'update' && (session as { type?: string } | null)?.type === 'token-refresh') {
        return await refreshAccessToken(token);
      }

      // 프로필(정보/이미지) 수정 후 세션 갱신 트리거: 토큰 유효성과 무관하게 최신 회원정보를
      // 다시 받아 세션에 병합한다. (update({ type: 'user-update' }) 로 1회 호출)
      if (trigger === 'update' && (session as { type?: string } | null)?.type === 'user-update') {
        const userInfoResponse = await userInfoGetFetch({ accessToken: token.accessToken });

        return { ...token, ...userInfoResponse.data.data };
      }

      const isValid = !!(token.accessTokenExpires && dayjs().isBefore(dayjs.unix(token.accessTokenExpires)));

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

      // 만료여도 여기서 자동 reissue 하지 않는다.
      // (병렬 세션 읽기마다 회전하면 strict 회전 백엔드와 레이스 → T005. 그래서 자동 refresh 제거.)
      // 재발급은 위의 'token-refresh' update 트리거(클라이언트 single-flight)로만 일어난다.
      return token;
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
