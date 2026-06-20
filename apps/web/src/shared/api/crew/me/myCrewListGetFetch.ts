import { apiFetch } from '../../common';
import type { HashTag, Mbti, ResponseModel } from '../../model';

export interface MyCrewListResponseProps extends ResponseModel {
  data: {
    id: number;
    name: string;
    introduce: string;
    imageUrl: string;
    kakaoLink: string;
    memberCount: number;
    hashtags: HashTag[];
    owner: {
      id: number;
      nickname: string;
      introduce: string;
      mbti: Mbti;
    };
  }[];
}

/**
 * 내가 개설한 크루 리스트 조회
 */
export const myCrewListGetFetch = async () => apiFetch.get<MyCrewListResponseProps>('/crews/me/owned');
