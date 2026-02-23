'use client';

import React from 'react';

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';

//TODO: 세션을 너무 많이 찌름, 개선 필요함. 라이브러리 자체 문제인 것 같은데, 한번 store로 래핑이 필요해보임
const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  return <NextAuthSessionProvider refetchOnWindowFocus={false}>{children}</NextAuthSessionProvider>;
};

export default SessionProvider;
