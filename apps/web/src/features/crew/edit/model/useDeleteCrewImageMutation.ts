import { crewQueries } from '@/entities/crew';
import { crewImageDeleteFetch } from '@/entities/crew/api';

import { useApiMutation } from '@/shared/lib/queries/useApiMutation';

/**
 * 크루 대표 이미지 삭제
 */
export const useDeleteCrewImageMutation = ({ crewId }: { crewId: number }) =>
  useApiMutation({
    fetcher: () => crewImageDeleteFetch({ crewId }),
    invalidateKey: crewQueries.root(),
  });
