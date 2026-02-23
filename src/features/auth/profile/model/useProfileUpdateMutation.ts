import { type UserProfilePutFetchParams, userProfilePutFetch } from '@/shared/api/user/userProfilePutFetch';
import { useApiMutation } from '@/shared/lib/queries';

export const useProfileUpdateMutation = () => {
  return useApiMutation({
    fetcher: (params: UserProfilePutFetchParams) => userProfilePutFetch(params),
  });
};
