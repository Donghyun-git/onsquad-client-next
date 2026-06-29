import {
  MutationCache,
  QueryCache,
  QueryClient,
  defaultShouldDehydrateQuery,
  environmentManager,
} from '@tanstack/react-query';

import { isTokenExpiredError } from '@/shared/lib/auth/isTokenExpiredError';

// 토큰 만료(T003 / 401) → 브라우저에서만 자동 로그아웃.
// 서버 prefetch 에러는 무시한다(window·next-auth 사용 불가). handleTokenExpiration 은
// next-auth/react(클라 전용)에 의존하므로 동적 import 로 서버 모듈 그래프에서 제외한다.
const handleExpirationOnClient = (error: unknown) => {
  const isServer = environmentManager.isServer();

  if (isServer || !isTokenExpiredError(error)) return;

  void import('@/shared/lib/auth/handleTokenExpiration').then((m) => m.handleTokenExpiration());
};

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        retry: false,
        throwOnError: true,
      },
      mutations: {
        throwOnError: true,
      },
      dehydrate: {
        // include pending queries in dehydration
        shouldDehydrateQuery: (query) => defaultShouldDehydrateQuery(query) || query.state.status === 'pending',
      },
    },
    // 백엔드가 모든 응답을 HTTP 200 으로 내려주므로 토큰 만료는 throw 된 QueryError 의 code 로만 판별된다.
    // 어떤 에러 바운더리가 잡든(또는 throwOnError:false 로 안 잡든) 놓치지 않도록 캐시 레벨에서 일괄 처리한다.
    queryCache: new QueryCache({
      onError: (error) => {
        // onError 에서 throw 하면 SSR/ISR prerender 가 크래시한다(특히 백엔드 미가동 시
        // 서버 prefetch 실패). 관찰만 하고 에러 전파는 각 쿼리의 throwOnError 에 위임한다.
        console.error('[queryCache] query error:', error.message);
        handleExpirationOnClient(error);
      },
    }),
    mutationCache: new MutationCache({
      onError: handleExpirationOnClient,
    }),
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (environmentManager.isServer()) {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}
