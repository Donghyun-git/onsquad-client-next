import NextAuth from 'next-auth';

import { PATH } from '@/shared/config/paths';

import authConfig from './auth.config';
import { userInfoGetFetch } from './shared/api/user/userInfoGetFetch';
import type { Mbti } from './shared/config';

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user) {
        token.id = user.id as unknown as number;
        token.email = user.email as unknown as string;
        token.nickname = user.nickname;
        token.gender = user.gender;
        token.birth = user.birth;
        token.userType = user.userType;
        token.address = user.address;
        token.addressDetail = user.addressDetail;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.mbti = user.mbti as string;
        token.kakaoLink = user.kakaoLink as string;
        token.profileImage = user.profileImage as string;
        token.introduce = user.introduce as string;
      }

      if (trigger === 'update') {
        const userInfoResponse = await userInfoGetFetch({
          accessToken: token.accessToken,
        });

        const newData = userInfoResponse.data.data;

        token = { ...token, ...newData };
      }

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
      // session.error = null;

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
