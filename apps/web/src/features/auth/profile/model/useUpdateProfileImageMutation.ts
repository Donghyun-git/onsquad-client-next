import { userProfileImagePatchFetch } from '@/entities/auth/api';
import { useApiMutation } from '@/shared/lib/queries';

/**
 * 회원 프로필 이미지 변경
 * - 세션 갱신은 호출부에서 update({ type: 'user-update' }) 로 처리한다.
 */
export const useUpdateProfileImageMutation = () =>
  useApiMutation({
    fetcher: (file: File) => userProfileImagePatchFetch({ file }),
  });
