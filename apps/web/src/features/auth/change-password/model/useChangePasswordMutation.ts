import { CircleCheck, CircleX } from 'lucide-react';

import { changePasswordPatchFetch } from '@/entities/auth/api/changePasswordPatchFetch';
import { PATH } from '@/shared/config/paths';
import { TOAST } from '@/shared/config/toast';
import { usePageMove } from '@/shared/lib/hooks';
import { useToast } from '@/shared/lib/hooks/useToast';
import { useApiMutation } from '@/shared/lib/queries';

export const useChangePasswordMutation = () => {
  const { handlePageMove } = usePageMove();
  const { toast } = useToast();

  return useApiMutation({
    fetcher: changePasswordPatchFetch,
    options: {
      onSuccess: (data) => {
        if (data.status === 204) {
          toast({
            title: '비밀번호 변경에 성공했어요.',
            className: TOAST.success,
            icon: CircleCheck,
          });

          handlePageMove(PATH.root, { scroll: false });
        } else {
          toast({
            title: '비밀번호 변경에 실패했어요.',
            className: TOAST.error,
            icon: CircleX,
          });
        }
      },
    },
  });
};
