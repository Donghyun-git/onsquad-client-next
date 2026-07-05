import { apiFetch } from '@/shared/api/common';
import type { ResponseModel } from '@/shared/api/model';

export interface CrewUpdatePutFetchParams {
  crewId: number;
  name: string;
  introduce: string;
  detail: string;
  hashtags: string[];
  kakaoLink: string;
}

export type CrewUpdatePutFetchResponseProps = ResponseModel;

/**
 * 크루 정보 수정 (이미지 제외)
 * - PUT /api/crews/{crewId}
 */
export const crewUpdatePutFetch = ({ crewId, ...body }: CrewUpdatePutFetchParams) =>
  apiFetch.put<CrewUpdatePutFetchResponseProps>(`/crews/${crewId}`, body);
