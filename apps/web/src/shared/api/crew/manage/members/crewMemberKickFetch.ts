import { apiFetch } from '@/shared/api/common';
import type { ResponseModel } from '@/shared/api/model';

export interface CrewMemberKickFetchParams {
  /** 크루 pk */
  crewId: number;
  /** 강퇴 대상 멤버 pk */
  targetMemberId: number;
}

export interface CrewMemberKickFetchResponseProps extends ResponseModel {
  data: '';
}

/**
 * 크루원 강퇴
 * - DELETE /api/crews/{crewId}/members/{targetMemberId}
 */
export const crewMemberKickFetch = ({ crewId, targetMemberId }: CrewMemberKickFetchParams) =>
  apiFetch.delete<CrewMemberKickFetchResponseProps>(`/crews/${crewId}/members/${targetMemberId}`);
