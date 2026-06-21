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

// NOTE(api): 공식 문서 미기재 경로 — 백엔드 실재 여부 확인 필요(내가 개설한 크루)
/**
 * 내가 개설한 크루 리스트 조회
 */
export const myCrewListGetFetch = async () => apiFetch.get<MyCrewListResponseProps>('/crews/me/owned');
