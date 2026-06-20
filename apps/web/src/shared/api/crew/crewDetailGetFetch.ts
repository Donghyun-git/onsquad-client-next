import { apiFetch } from '../common';
import type { HashTag, Mbti, ResponseModel } from '../model';

export interface CrewDetailGetFetchParams {
  /**
   * 크루 pk
   */
  crewId: number;

  /** 서버사이드 prefetch 시 명시 주입 (클라이언트는 store 사용) */
  accessToken?: string;
}

export interface CrewDetailResponseProps extends ResponseModel {
  data: {
    states: {
      /**
       * 크루 참여 여부
       */
      alreadyParticipant: boolean;

      /**
       * 크루 신청 진행중 여부
       */
      alreadyRequest?: boolean;
    };

    /**
     * 크루 pk
     */
    id: number;

    /**
     * 크루 이름
     */
    name: string;

    /**
     * 크루 소개
     */
    introduce: string;

    /**
     * 크루 상세 정보
     */
    detail: string;

    /**
     * 크루 대표 이미지
     * - 없을 경우 서버 default 이미지
     */
    imageUrl: string;

    /**
     * 카카오 오픈챗 링크
     */
    kakaoLink: string;

    /**
     * 해시태그
     * - 첫번 째 인덱스는 멤버 수 int
     */
    hashtags: [number, ...HashTag[]];

    /**
     * 크루 주인 이름
     */
    owner: {
      /**
       * 크루 주인 pk
       */
      id: number;

      /**
       * 주인 닉네임
       */
      nickname: string;

      mbti: Mbti | '';
    };
  };
}

/**
 * 크루 상세 정보 조회
 */
export const crewDetailGetFetch = ({ crewId, accessToken }: CrewDetailGetFetchParams) =>
  apiFetch.get<CrewDetailResponseProps>(`/crews/${crewId}`, { accessToken });
