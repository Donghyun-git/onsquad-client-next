import { UseMutationOptions, UseMutationResult, useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { CircleX } from 'lucide-react';

import type { ApiResponse } from '@/shared/api/common';
import { ResponseModel } from '@/shared/api/model';
import { TOAST } from '@/shared/config/toast';
import { handleTokenExpiration, isTokenExpiredError } from '@/shared/lib/auth/handleTokenExpiration';
import { useToast } from '@/shared/lib/hooks/useToast';

import { QueryError } from './useApiQuery';

export const useApiMutation = <
  TMutationKey extends [string, Record<string, unknown>?],
  TMutationFnData extends ResponseModel,
  TInvalidateKey extends unknown[],
  TError = Error,
  TVariables = void,
  TContext = unknown,
>({
  mutationKey,
  fetcher,
  invalidateKey,
  invalidateKeys,
  options,
}: {
  mutationKey?: TMutationKey;
  invalidateKey?: TInvalidateKey;
  invalidateKeys?: TInvalidateKey[];
  fetcher: (variables: TVariables) => Promise<ApiResponse<TMutationFnData>>;
  options?: Omit<UseMutationOptions<TMutationFnData, TError, TVariables, TContext>, 'mutationKey' | 'mutationFn'>;
}): UseMutationResult<TMutationFnData, TError, TVariables, TContext> => {
  const queryClient = useQueryClient();

  const { toast, hide } = useToast();

  return useMutation<TMutationFnData, TError, TVariables, TContext>({
    mutationKey,
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
      // 토큰 만료 시 toast 대신 자동 로그아웃 후 로그인 페이지로 이동한다.
      if (isTokenExpiredError(error)) {
        void handleTokenExpiration();

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
