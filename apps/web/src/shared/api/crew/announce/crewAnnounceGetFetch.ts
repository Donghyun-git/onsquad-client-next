import type { CrewRole } from '@/shared/types';

import { apiFetch } from '../../common';
import type { Mbti, ResponseModel } from '../../model';

export interface CrewAnnounceGetFetchParams {
  crewId: number;
}

export interface CrewAnnounceListResponseProps extends ResponseModel {
  data: {
    states: {
      /**
       * 공지사항 작성 가능 여부
       */
      canWrite: boolean;

      /**
       * 공지사항 수정 가능 여부
       * FIXME(api): 문서에 없음 — 소비처 AnnounceList.tsx, AnnounceDetail.tsx 정리 후 제거 검토
       */
      role: CrewRole;
    };
    /**
     * 공지사항 리스트
     */
    announces: [
      {
        /**
         * 공지사항 pk
         */
        id: number;
        /**
         * 공지사항 제목
         */
        title: string;
        /**
         * 공지사항 내용
         */
        content: string;
        /**
         * 공지사항 작성일
         */
        createdAt: string;
        /**
         * 공지사항 상단 고정 여부
         */
        pinned: boolean;
        /**
         * 공지사항 상단 고정 일자
         */
        pinnedAt: string;

        writer: {
          id: number;
          nickname: string;
          introduce: string;
          mbti: Mbti;
          role: string; // FIXME(api): 문서에 없음 — 소비처 AnnounceList.tsx 정리 후 제거 검토
        };

        states: {
          /**
           * 공지사항 작성자 역할
           * FIXME(api): 문서에 없음 — 소비처 AnnounceList.tsx 정리 후 제거 검토
           */
          role: CrewRole;
        };
      },
    ];
  };
}

/**
 * 크루 별 공지사항 리스트 전체 조회
 * - 일단 전체조회만
 */
export const crewAnnounceGetFetch = ({ crewId }: CrewAnnounceGetFetchParams) =>
  apiFetch.get<CrewAnnounceListResponseProps>(`/crews/${crewId}/announces`);
