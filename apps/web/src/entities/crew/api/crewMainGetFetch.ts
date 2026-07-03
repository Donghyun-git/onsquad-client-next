import { apiFetch } from '@/shared/api/common';
import { ResponseModel } from '@/shared/api/model';

export interface CrewMainGetFetchParams {
  crewId: number;
}

export interface CrewMainGetFetchResponse extends ResponseModel {
  data: {};
}

/**
 * 크루 메인 페이지 데이터
 */
export const crewMainGetFetch = ({ crewId }: CrewMainGetFetchParams) =>
  apiFetch.get<CrewMainGetFetchResponse>(`/crews/${crewId}/main`);
