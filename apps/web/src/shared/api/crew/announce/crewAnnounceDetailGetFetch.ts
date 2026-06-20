import type { CrewRole } from '@/shared/types';

import { apiFetch } from '../../common';
import type { Mbti, ResponseModel } from '../../model';

export interface CrewAnnounceDetailGetFetchParams {
  crewId: number;
  announceId: number;

  /** 서버사이드 prefetch 시 명시 주입 (클라이언트는 store 사용) */
  accessToken?: string;
}

export interface CrewAnnounceDetailResponseProps extends ResponseModel {
  data: {
    states: {
      /**
       * 공지사항 작성자 역할
       */
      role: CrewRole;

      /**
       * 상단고정 여부
       */
      canPin: boolean;

      /**
       * 수정 가능 여부
       */
      canModify: boolean;
    };
    id: number;
    title: string;
    content: string;
    createdAt: string;
    pinned: boolean;
    writer: {
      id: number;
      nickname: string;
      introduce: string;
      mbti: Mbti | '';
    };
  };
}

/**
 * 크루 공지사항 상세 조회
 */
export const crewAnnounceDetailGetFetch = ({ crewId, announceId, accessToken }: CrewAnnounceDetailGetFetchParams) =>
  apiFetch.get<CrewAnnounceDetailResponseProps>(`/crews/${crewId}/announces/${announceId}`, { accessToken });
