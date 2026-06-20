import { publicApiFetch } from '../common';
import type { HashTag, Mbti, ResponseModel } from '../model';

export interface CrewListGetFetchParams {
  size?: number;
  page?: number;
  crewName?: string;
}

export interface CrewListResponseProps extends ResponseModel {
  data: {
    page: number;
    results: {
      /**
       * 크루 pk
       */
      id: number;

      /**
       * 크루명
       */
      name: string;

      /**
       * 크루 소개
       */
      introduce: string;

      /**
       * 이미지 링크
       */
      imageUrl: string;

      /**
       * 소통방 링크
       */
      kakaoLink: string;

      /**
       * 해시태그 배열
       */
      hashtags: HashTag[];

      /**
       * 멤버 수
       */
      memberCount: number;

      /**
       * 크루장 정보
       */
      owner: {
        /**
         * 크루장 멤버 pk
         */
        id: number;

        /**
         * 크루장 닉네임
         */
        nickname: string;

        /**
         * 엠비티아이
         */
        mbti: Mbti;
      };
    }[];

    resultsSize: number;
    size: number;
    totalCount: number;
    totalPages: number;
  };
}

export const crewListGetFetch = (params?: CrewListGetFetchParams) => {
  if (params) {
    return publicApiFetch.get<CrewListResponseProps>(
      `/crews?size=${params.size}&page=${params.page}&name=${params.crewName}`,
    );
  }

  return publicApiFetch.get<CrewListResponseProps>('/crews');
};
