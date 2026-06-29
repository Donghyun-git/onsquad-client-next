import { type UseQueryOptions, queryOptions } from '@tanstack/react-query';

import type { ApiResponse } from '@/shared/api/common';
import type { ResponseModel } from '@/shared/api/model';

import { QueryError } from './useApiQuery';

export const makeQueryOptions = <
  TQueryKey extends readonly unknown[],
  TQueryFnData extends ResponseModel,
  TError = Error,
  TData = TQueryFnData,
>(
  queryKey: TQueryKey,
  queryFn: () => Promise<ApiResponse<TQueryFnData>>,
): UseQueryOptions<TQueryFnData, TError, TData, TQueryKey> => {
  return queryOptions<TQueryFnData, TError, TData, TQueryKey>({
    queryKey,
    queryFn: async () => {
      const res = await queryFn();

      if (res.data.error) {
        throw new QueryError(res.data.error.code, res.data.error.message);
      }

      return res.data;
    },
    // 토큰 만료를 포함한 로그아웃 처리는 QueryClient 의 QueryCache.onError 에서 중앙화한다.
    // 여기서는 에러를 바운더리로 던지지 않아 일부 위젯(예: 배지 카운트) 실패가 화면 전체를 막지 않게 한다.
    throwOnError: false,
  });
};
