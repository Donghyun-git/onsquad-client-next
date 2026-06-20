import { type UseQueryOptions, queryOptions } from '@tanstack/react-query';

import type { ApiResponse } from '@/shared/api/common';
import type { ResponseModel } from '@/shared/api/model';

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
        throw new Error(res.data.error.message);
      }

      return res.data;
    },
    throwOnError: true,
  });
};
