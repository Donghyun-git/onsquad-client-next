import { apiFetch } from '@/shared/api/common';
import type { Mbti, ResponseModel } from '@/shared/api/model';

export interface CrewParticipantsGetFetchParams {
  crewId: number;
  size?: number;
  page?: number;

  /** 서버사이드 prefetch 시 명시 주입 (클라이언트는 store 사용) */
  accessToken?: string;
}

export interface CrewParticipantsResponseProps extends ResponseModel {
  data: {
    size: number;
    page: number;
    totalPages: number;
    totalCount: number;
    resultsSize: number;
    results: {
      id: number;
      requestAt: string;
      requester: {
        id: number;
        nickname: string;
        introduce: string;
        mbti: Mbti | '';
      };
    }[];
  };
}

/**
 * 크루 참가신청자 목록 조회
 */
export const crewParticipantsGetFetch = ({ crewId, size = 5, page = 1, accessToken }: CrewParticipantsGetFetchParams) =>
  apiFetch.get<CrewParticipantsResponseProps>(`/crews/${crewId}/requests?size=${size}&page=${page}`, { accessToken });
