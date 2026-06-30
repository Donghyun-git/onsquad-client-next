import { crewQueries } from '@/entities/crew';

import { crewDeleteFetch } from '@/entities/crew/api/crewDeleteFetch';
import { useApiMutation } from '@/shared/lib/queries/useApiMutation';

export const useDeleteCrewMutation = ({ crewId }: { crewId: number }) =>
  useApiMutation({
    fetcher: () => crewDeleteFetch({ crewId }),
    invalidateKeys: [crewQueries.lists()],
  });
