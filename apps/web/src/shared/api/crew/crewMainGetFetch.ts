import { apiFetch } from '../common';
import { ResponseModel } from '../model';

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
  apiFetch.get<CrewMainGetFetchResponse>(`/crew/${crewId}/main`);
