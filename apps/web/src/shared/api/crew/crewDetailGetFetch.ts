import { apiFetch } from '../common';
import type { HashTag, Mbti, ResponseModel } from '../model';

export interface CrewDetailGetFetchParams {
  /**
   * 크루 pk
   */
  crewId: number;
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
     * FIXME(api): 문서상 hashtags는 순수 HashTag[], memberCount는 별도 최상위 필드.
     *             소비처 CrewDetail.tsx가 hashtags[0]을 숫자(멤버수)로 의존 중 — 소비처 정리 후 `HashTag[]`로 교체 및 memberCount 필드 분리 검토.
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

      /**
       * 주인 소개
       */
      introduce: string;

      mbti: Mbti | '';
    };
  };
}

/**
 * 크루 상세 정보 조회
 */
export const crewDetailGetFetch = ({ crewId }: CrewDetailGetFetchParams) =>
  apiFetch.get<CrewDetailResponseProps>(`/crews/${crewId}`);
