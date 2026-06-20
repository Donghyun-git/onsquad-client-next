import { apiFetch } from '../common';
import { ResponseModel } from '../model';
import { Mbti } from './../../config';

export interface UserProfilePutFetchParams {
  nickname: string;
  introduce: string;
  mbti: Mbti | '';
  kakaoLink: string;
  address: string;
  addressDetail: string;
}

export type UserProfileUpdateResponseProps = ResponseModel;

/**
 * 유저 프로필 정보 수정
 */
export const userProfilePutFetch = (params: UserProfilePutFetchParams) =>
  apiFetch.put<UserProfileUpdateResponseProps>('/members/me', params);
