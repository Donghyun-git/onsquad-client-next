import { apiFetch } from '../common';
import { ResponseModel } from '../model';

export interface UserEmailCheckGetFetchParams {
  email: string;
}

export interface UserEmailCheckGetFetchResponse extends ResponseModel {
  data: {
    duplicate: boolean;
  };
}

/**
 * 이메일 중복체크
 */
export const userEmailCheckGetFetch = ({ email }: UserEmailCheckGetFetchParams) =>
  apiFetch.get<UserEmailCheckGetFetchResponse>(`/members/check-email?value=${email}`);
