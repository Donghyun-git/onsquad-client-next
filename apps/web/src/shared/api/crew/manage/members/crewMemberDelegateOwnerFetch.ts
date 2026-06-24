import { apiFetch } from '@/shared/api/common';
import type { ResponseModel } from '@/shared/api/model';

export interface CrewMemberDelegateOwnerFetchParams {
  /** 크루 pk */
  crewId: number;
  /** 위임 대상 멤버 pk */
  targetMemberId: number;
}

export interface CrewMemberDelegateOwnerFetchResponseProps extends ResponseModel {
  data: '';
}

/**
 * 크루장 위임
 * - PATCH /api/crews/{crewId}/members/{targetMemberId}/owner
 */
export const crewMemberDelegateOwnerFetch = ({ crewId, targetMemberId }: CrewMemberDelegateOwnerFetchParams) =>
  apiFetch.patch<CrewMemberDelegateOwnerFetchResponseProps>(`/crews/${crewId}/members/${targetMemberId}/owner`);
