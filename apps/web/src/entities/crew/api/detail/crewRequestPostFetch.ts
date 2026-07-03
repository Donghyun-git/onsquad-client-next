import { apiFetch } from '@/shared/api/common';
import type { ResponseModel } from '@/shared/api/model';

export interface CrewRequestPostFetchParams {
  crewId: number;
}

export type CrewRequestResponseProps = ResponseModel;

/**
 * 크루 참가 신청(요청) 하기
 */
export const crewRequestPostFetch = ({ crewId }: CrewRequestPostFetchParams) =>
  apiFetch.post<CrewRequestResponseProps>(`/crews/${crewId}/requests`);
