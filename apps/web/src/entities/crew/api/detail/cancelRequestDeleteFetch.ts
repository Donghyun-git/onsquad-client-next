import { apiFetch } from '@/shared/api/common';
import type { ResponseModel } from '@/shared/api/model';

export interface CancelRequestDeleteFetchParams {
  crewId: number;
}

export type CancelRequestResponseProps = ResponseModel;

/**
 * 크루 참가 신청 취소 요청
 */
export const cancelRequestDeleteFetch = ({ crewId }: CancelRequestDeleteFetchParams) =>
  apiFetch.delete<CancelRequestResponseProps>(`/crews/${crewId}/requests/me`);
