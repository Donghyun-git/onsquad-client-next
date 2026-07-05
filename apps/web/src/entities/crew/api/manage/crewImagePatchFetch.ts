import { apiFetch } from '@/shared/api/common';
import type { ResponseModel } from '@/shared/api/model';

export interface CrewImagePatchFetchParams {
  crewId: number;
  file: File;
}

export type CrewImagePatchFetchResponseProps = ResponseModel;

/**
 * 크루 대표 이미지 변경
 * - PATCH /api/crews/{crewId}/image (multipart, part name: file)
 */
export const crewImagePatchFetch = ({ crewId, file }: CrewImagePatchFetchParams) => {
  const formData = new FormData();

  formData.append('file', file);

  return apiFetch.patch<CrewImagePatchFetchResponseProps>(`/crews/${crewId}/image`, formData);
};
