/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth, { Session as DefaultSession, User as DefaultUser } from 'next-auth';
import { JWT } from 'next-auth/jwt';

import { Mbti } from './shared/config';

declare module 'next-auth' {
  interface User extends DefaultUser {
    id: number;
    nickname: string;
    user: {
      email: string;
    };
    gender: 'male' | 'female';
    birth: string;
    userType: string;
    address: string;
    addressDetail: string;
    accessToken: string;
    refreshToken: string;
    introduce: string;
    profileImage: string;
    mbti: Mbti | '';
    kakaoLink: string;
  }

  interface Session extends DefaultSession {
    id: number;
    nickname: string;
    user: {
      email: string;
    };
    gender: 'male' | 'female';
    birth: string;
    userType: string;
    address: string;
    addressDetail: string;
    accessToken: string;
    refreshToken: string;
    mbti: Mbti | '';
    profileImage?: string;
    introduce: string;
    kakaoLink: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: number;
    nickname: string;
    email: string;
    gender: 'male' | 'female';
    birth: string;
    userType: string;
    address: string;
    addressDetail: string;
    accessToken: string;
    refreshToken: string;
  }
}
