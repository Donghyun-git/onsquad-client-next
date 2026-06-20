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
  try {
    const res = await tokenRefreshGetFetch({
      refreshToken: token.refreshToken,
    });

    if (res.data.status === 401) {
      throw new Error('RefreshAccessTokenError');
    }

    const newToken = res.data.data;

    return {
      ...token,
      accessToken: newToken.accessToken,
      refreshToken: newToken.refreshToken ?? token.refreshToken,
      accessTokenExpires: dayjs().add(20, 'minute').unix(),
    };
  } catch (error) {
    console.error(error);

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

      if (token.accessTokenExpires && dayjs().isBefore(dayjs.unix(token.accessTokenExpires))) {
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
