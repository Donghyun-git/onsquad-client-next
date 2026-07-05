import { crewQueries } from '@/entities/crew';
import { crewImagePatchFetch } from '@/entities/crew/api';

import { useApiMutation } from '@/shared/lib/queries/useApiMutation';

/**
 * 크루 대표 이미지 변경
 */
export const useUpdateCrewImageMutation = ({ crewId }: { crewId: number }) =>
  useApiMutation({
    fetcher: (file: File) => crewImagePatchFetch({ crewId, file }),
    invalidateKey: crewQueries.root(),
  });
