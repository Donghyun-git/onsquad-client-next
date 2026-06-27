import { apiFetch } from '@/shared/api/common';
import type { ResponseModel } from '@/shared/api/model';

export interface CrewMemberLeaveFetchParams {
  crewId: number;
}

export type CrewMemberLeaveResponseProps = ResponseModel;

/**
 * 크루 나가기
 * - DELETE /api/crews/{crewId}/members/me
 */
export const crewMemberLeaveFetch = ({ crewId }: CrewMemberLeaveFetchParams) =>
  apiFetch.delete<CrewMemberLeaveResponseProps>(`/crews/${crewId}/members/me`);
