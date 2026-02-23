import { QueryKey, UseQueryOptions, UseQueryResult, useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { ErrorCode, ResponseModel } from '@/shared/api/model';

export class QueryError extends Error {
  code: ErrorCode | string;
  message: string;

  constructor(code: ErrorCode | string, message: string) {
    super();

    this.code = code;
    this.message = message;
  }
}

export const useApiQuery = <
  TQueryKey extends readonly unknown[],
  TQueryFnData extends ResponseModel,
  TError = Error | QueryError,
  TData = TQueryFnData,
>({
  queryKey,
  fetcher,
  options,
}: {
  queryKey: TQueryKey;
  fetcher: () => Promise<AxiosResponse<TQueryFnData>>;
  options?: Omit<UseQueryOptions<TQueryFnData, TError, TData, QueryKey>, 'queryKey' | 'queryFn'>;
  toast?: boolean;
}): UseQueryResult<TData, TError> =>
  useQuery<TQueryFnData, TError, TData>({
    queryKey,
    queryFn: async () => {
      const res = await fetcher();

      if (res.data.error) {
        throw new Error(res.data.error.message);
      }

      return res.data;
    },
    ...options,
  });
