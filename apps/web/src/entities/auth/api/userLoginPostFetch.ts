import { apiFetch } from '@/shared/api/common';
import type { ResponseModel } from '@/shared/api/model';

export interface UserLoginPostFetchParams {
  email: string;
  password: string;
}

export interface UserLoginResponseProps extends ResponseModel {
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

export const userLoginPostFetch = (params: UserLoginPostFetchParams) =>
  apiFetch.post<UserLoginResponseProps>('/auth/login', params);
