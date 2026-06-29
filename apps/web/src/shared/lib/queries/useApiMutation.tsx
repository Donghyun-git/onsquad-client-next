import { UseMutationOptions, UseMutationResult, useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { CircleX } from 'lucide-react';

import type { ApiResponse } from '@/shared/api/common';
import { ResponseModel } from '@/shared/api/model';
import { TOAST } from '@/shared/config/toast';
import { isTokenExpiredError } from '@/shared/lib/auth/isTokenExpiredError';
import { useToast } from '@/shared/lib/hooks/useToast';

import { QueryError } from './useApiQuery';

export const useApiMutation = <
  TMutationFnData extends ResponseModel,
  TInvalidateKey extends unknown[],
  TError = Error,
  TVariables = void,
  TContext = unknown,
>({
  fetcher,
  invalidateKey,
  invalidateKeys,
  options,
}: {
  invalidateKey?: TInvalidateKey;
  invalidateKeys?: TInvalidateKey[];
  fetcher: (variables: TVariables) => Promise<ApiResponse<TMutationFnData>>;
  options?: Omit<UseMutationOptions<TMutationFnData, TError, TVariables, TContext>, 'mutationKey' | 'mutationFn'>;
}): UseMutationResult<TMutationFnData, TError, TVariables, TContext> => {
  const queryClient = useQueryClient();

  const { toast, hide } = useToast();

  return useMutation<TMutationFnData, TError, TVariables, TContext>({
    mutationFn: async (variables: TVariables) => {
      const res = await fetcher(variables);

      if (res.data.error) {
        throw new QueryError(res.data.error.code, res.data.error.message);
      }

      return res.data;
    },
    onSuccess: () => {
      if (invalidateKey) {
        queryClient.invalidateQueries({ queryKey: invalidateKey });
      }

      if (invalidateKeys) {
        invalidateKeys.forEach((key) => {
          queryClient.invalidateQueries({ queryKey: key });
        });
      }
    },
    onError: (error) => {
      // 토큰 만료 로그아웃은 MutationCache.onError(get-query-client)에서 중앙 처리한다.
      // 여기서는 만료 에러에 대해 toast 만 띄우지 않도록 조기 반환한다.
      if (isTokenExpiredError(error)) {
        return error;
      }

      if (error instanceof Error) {
        toast({
          title: error.message,
          className: TOAST.error,
          icon: <CircleX onClick={() => hide()} />,
        });
      }

      return error;
    },
    ...options,
    throwOnError: false,
  });
};
