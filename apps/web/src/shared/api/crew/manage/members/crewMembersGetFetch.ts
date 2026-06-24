import { apiFetch } from '@/shared/api/common';
import type { Mbti, ResponseModel } from '@/shared/api/model';

export interface CrewMembersGetFetchParams {
  crewId: number;
  size?: number;
  page?: number;
}

export interface CrewMemberItem {
  states: {
    /** 내 항목 여부 */
    isMe: boolean;
    /** 강퇴 가능 여부 */
    canKick: boolean;
    /** 크루장 위임 가능 여부 */
    canDelegateOwner: boolean;
  };
  participateAt: string;
  member: {
    id: number;
    nickname: string;
    introduce: string;
    mbti: Mbti | '';
  };
}

export interface CrewMembersResponseProps extends ResponseModel {
  data: {
    size: number;
    page: number;
    totalPages: number;
    totalCount: number;
    resultsSize: number;
    results: CrewMemberItem[];
  };
}

/**
 * 크루원 목록 조회
 * - GET /api/crews/{crewId}/members
 */
export const crewMembersGetFetch = ({ crewId, size = 5, page = 0 }: CrewMembersGetFetchParams) =>
  apiFetch.get<CrewMembersResponseProps>(`/crews/${crewId}/members?size=${size}&page=${page}`);
