import { apiFetch, publicApiFetch } from '@/shared/api/common';
import type { Mbti, ResponseModel } from '@/shared/api/model';

export interface UserInfoGetFetchParams {
  accessToken: string;
}

export interface UserInfoResponse extends ResponseModel {
  data: {
    /**
     * 유저 식별값
     */
    id: number;

    /**
     * 유저 닉네임
     */
    nickname: string;

    /**
     * 유저 이메일
     */
    email: string;

    /**
     * 소개
     */
    introduce: string;

    /**
     * MBTI
     */
    mbti: Mbti | '';

    /**
     * 카카오 링크
     */
    kakaoLink: string;

    /**
     * 프로필 이미지
     */
    profileImage: string;

    /**
     * 성별
     * FIXME(api): 문서에 없음 — 소비처 auth.ts, next-auth.d.ts 정리 후 제거 검토
     */
    gender: 'male' | 'female';

    /**
     * 생년월일
     * FIXME(api): 문서에 없음 — 소비처 auth.ts, next-auth.d.ts 정리 후 제거 검토
     */
    birth: string;

    /**
     * 로그인 유형
     */
    userType: '일반' | '카카오' | '구글';

    /**
     * 주소
     */
    address: string;

    /**
     * 상세주소
     */
    addressDetail: string;
  };
}

export const userInfoGetFetch = (params: Partial<UserInfoGetFetchParams>) => {
  const accessToken = params?.accessToken;

  if (!accessToken) {
    return apiFetch.get<UserInfoResponse>('/members/me');
  }

  return publicApiFetch.get<UserInfoResponse>('/members/me', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
