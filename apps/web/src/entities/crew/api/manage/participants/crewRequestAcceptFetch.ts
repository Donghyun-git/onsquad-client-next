import { apiFetch } from '@/shared/api/common';
import type { ResponseModel } from '@/shared/api/model';

export interface CrewRequestAcceptFetchParams {
  /** 크루 pk */
  crewId: number;
  /** 신청 pk */
  requestId: number;
}

export interface CrewRequestAcceptFetchResponseProps extends ResponseModel {
  data: '';
}

/**
 * 크루 참가 신청 수락
 * - PATCH /api/crews/{crewId}/requests/{requestId}
 */
export const crewRequestAcceptFetch = ({ crewId, requestId }: CrewRequestAcceptFetchParams) =>
  apiFetch.patch<CrewRequestAcceptFetchResponseProps>(`/crews/${crewId}/requests/${requestId}`);
