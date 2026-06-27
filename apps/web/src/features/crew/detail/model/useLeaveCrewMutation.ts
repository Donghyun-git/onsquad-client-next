import { crewQueries } from '@/entities/crew';
import { crewMemberLeaveFetch } from '@/shared/api/crew/manage/members/crewMemberLeaveFetch';
import { useApiMutation } from '@/shared/lib/queries/useApiMutation';

export const useLeaveCrewMutation = ({ crewId }: { crewId: number }) => {
  return useApiMutation({
    fetcher: () => crewMemberLeaveFetch({ crewId }),
    invalidateKey: crewQueries.detail({ crewId }).queryKey,
  });
};
