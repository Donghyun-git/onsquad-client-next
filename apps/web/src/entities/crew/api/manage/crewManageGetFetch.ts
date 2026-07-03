import { apiFetch } from '@/shared/api/common';
import type { ResponseModel } from '@/shared/api/model';

export interface CrewManageGetFetchParams {
  crewId: number;
}

export interface CrewManageResponseProps extends ResponseModel {
  data: {
    states: {
      /**
       * 크루 정보 수정 여부
       */
      canModify: boolean;

      /**
       * 크루 삭제 여부
       */
      canDelete: boolean;
    };

    /**
     * 요청 수
     */
    requestCnt: number;

    /**
     * 스쿼드 수
     */
    squadCnt: number;

    /**
     * 크루 멤버 수
     */
    memberCnt: number;
  };
}

/**
 * 크루 관리 정보 조회
 */
export const crewManageGetFetch = ({ crewId }: CrewManageGetFetchParams) =>
  apiFetch.get<CrewManageResponseProps>(`/crews/${crewId}/manage`);
