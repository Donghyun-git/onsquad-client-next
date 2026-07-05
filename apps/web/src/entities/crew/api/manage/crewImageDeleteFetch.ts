import { apiFetch } from '@/shared/api/common';
import type { ResponseModel } from '@/shared/api/model';

export interface CrewImageDeleteFetchParams {
  crewId: number;
}

export type CrewImageDeleteFetchResponseProps = ResponseModel;

/**
 * 크루 대표 이미지 삭제 (서버 기본 이미지로 대체)
 * - DELETE /api/crews/{crewId}/image
 */
export const crewImageDeleteFetch = ({ crewId }: CrewImageDeleteFetchParams) =>
  apiFetch.delete<CrewImageDeleteFetchResponseProps>(`/crews/${crewId}/image`);
