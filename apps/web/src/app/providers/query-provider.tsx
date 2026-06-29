'use client';

import type * as React from 'react';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { getQueryClient } from '@/shared/lib/queries/get-query-client';

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  // 서버/클라이언트 공용 단일 QueryClient. (브라우저는 싱글턴을 재사용 — get-query-client 참조)
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
