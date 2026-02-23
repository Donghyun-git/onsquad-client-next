import { apiFetch } from '../../common';
import type { HashTag, Mbti, ResponseModel } from '../../model';

export interface CrewHomeInfoGetFetchParams {
  /**
   * 크루 pk
   */
  crewId: number;

  /**
   * 페이지 번호 (0부터 시작)
   */
  page?: number;

  /**
   * 한 페이지당 개수
   */
  size?: number;
}

export interface CrewHomeInfoResponseProps extends ResponseModel {
  data: {
    states: {
      /**
       * 크루 관리 권한 여부
       * - true: 관리자
       * - false: 일반 유저
       */
      canManage: boolean;
    };

    /**
     * 크루 정보
     */
    crew: {
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
       * 크루 상세정보
       */
      detail: string;

      /**
       * 크루 이미지
       */
      imageUrl: string;

      /**
       * 오픈챗 링크
       */
      kakaoLink: string;

      /**
       * 해시태그
       */
      hashtags: HashTag[];

      /**
       * 크루원 수
       */
      memberCount: number;

      /**
       * 크루 주인
       */
      owner: {
        /**
         * 크루주인 pk
         */
        id: number;

        /**
         * 닉네임
         */
        nickname: string;

        /**
         * 소개
         */
        introduce: string;

        /**
         * mbti
         */
        mbti: Mbti;
      };
    };

    /**
     * 공지사항
     */
    announces: {
      /**
       * 게시글 pk
       */
      id: number;

      /**
       * 제목
       */
      title: string;

      /**
       * 내용
       */
      content: string;

      /**
       * 작성일자
       */
      createdAt: string;

      /**
       * 게시글 상단 고정 여부
       * - true: 고정
       * - false: 미고정
       */
      pinned: boolean;

      /**
       * 공지사항 작성자
       */
      writer: {
        id: number;
        nickname: string;
        introduce: string;
        mbti: Mbti | '';
      };

      /**
       * 작성자 역할 (크루 공지사항 목록 API와 호환)
       */
      states?: {
        role?: string;
      };
    }[];

    /**
     * 랭킹
     */
    rankers: {
      /**
       * 크루 pk
       */
      crewId: number;

      /**
       * 유저 pk
       */
      memberId: number;

      /**
       * 유저 닉네임
       */
      nickname: string;

      /**
       * mbti
       */
      mbti: Mbti;

      /**
       * 랭킹 순위
       */
      rank: number;

      /**
       * 점수 (작성한 게시글 수 등)
       */
      score: number;

      /**
       * 마지막 활동 시간
       * - Date string
       */
      lastActivityTime: string;
    }[];

    squads: {
      /**
       * 스쿼드 pk
       */
      id: number;

      /**
       * 스쿼드 이름
       */
      title: string;

      /**
       * 스쿼드 설명
       */
      content: string;

      /**
       * 모집인원
       */
      capacity: number;

      /**
       * 모집인원 중 남은 인원
       */
      remain: number;

      /**
       * 모임 주소
       */
      address: string;

      /**
       * 모임 상세 주소
       */
      addressDetail: string;

      /**
       * 카카오 링크
       */
      kakaoLink: string;

      /**
       * 디스코드 초대링크
       */
      discordLink: string;

      /**
       * 모집 카테고리
       */
      categories: string[];

      /**
       * 스쿼드 주인 정보
       */
      leader: {
        /**
         * 스쿼드 주인 pk
         */
        id: number;

        /**
         * 스쿼드 주인 닉네임
         */
        nickname: string;

        /**
         * 스쿼드 주인 소개
         */
        introduce: string;

        /**
         * 스쿼드 주인 엠비티아이
         */
        mbti: Mbti;
      };
    }[];
  };
}

/**
 * 크루 메인 페이지 정보
 * - GET /api/crews/{crewId}/main
 */
export const crewHomeInfoGetFetch = ({ crewId, page, size }: CrewHomeInfoGetFetchParams) =>
  apiFetch.get<CrewHomeInfoResponseProps>(`/crews/${crewId}/main?page=${page}&size=${size}`);
