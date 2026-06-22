import { apiFetch } from '@/shared/api/common';
import type { ResponseModel } from '@/shared/api/model';

export interface CrewRequestRejectFetchParams {
  /** 크루 pk */
  crewId: number;
  /** 신청 pk */
  requestId: number;
}

export interface CrewRequestRejectFetchResponseProps extends ResponseModel {
  data: '';
}

/**
 * 크루 참가 신청 거절
 * - DELETE /api/crews/{crewId}/requests/{requestId}
 */
export const crewRequestRejectFetch = ({ crewId, requestId }: CrewRequestRejectFetchParams) =>
  apiFetch.delete<CrewRequestRejectFetchResponseProps>(`/crews/${crewId}/requests/${requestId}`);
