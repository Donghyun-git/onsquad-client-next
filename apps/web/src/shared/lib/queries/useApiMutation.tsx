import { UseMutationOptions, UseMutationResult, useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { CircleX } from 'lucide-react';

import { ResponseModel } from '@/shared/api/model';
import { TOAST } from '@/shared/config/toast';
import { useToast } from '@/shared/lib/hooks/useToast';

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
  fetcher: (variables: TVariables) => Promise<AxiosResponse<TMutationFnData>>;
  options?: Omit<UseMutationOptions<TMutationFnData, TError, TVariables, TContext>, 'mutationKey' | 'mutationFn'>;
}): UseMutationResult<TMutationFnData, TError, TVariables, TContext> => {
  const queryClient = useQueryClient();

  const { toast, hide } = useToast();

  return useMutation<TMutationFnData, TError, TVariables, TContext>({
    mutationKey,
    mutationFn: async (variables: TVariables) => {
      const res = await fetcher(variables);

      if (res.data.error) {
        throw new Error(res.data.error.message);
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
