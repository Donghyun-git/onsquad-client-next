import { apiFetch } from '../common';
import { ResponseModel } from '../model';

export interface UserJoinPostFetchParams {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
  address: string;
  addressDetail?: string;
}

export interface UserJoinPostResponseProps extends ResponseModel {
  data: {
    token: string;
  };
}

/**
 * 회원가입
 */
export const userJoinPostFetch = (params: UserJoinPostFetchParams) =>
  apiFetch.post<UserJoinPostResponseProps>('/members', params);
