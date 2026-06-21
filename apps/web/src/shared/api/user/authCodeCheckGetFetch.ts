import { publicApiFetch } from '../common';
import { ResponseModel } from '../model';

export interface AuthCodeCheckGetFetchParams {
  email: string;
  authCode: string;
}

export interface AuthCodeCheckResponseProps extends ResponseModel {
  data: {
    valid: boolean;
  };
}

/**
 * 인증코드 확인
 */
export const authCodeCheckGetFetch = ({ email, authCode }: AuthCodeCheckGetFetchParams) =>
  publicApiFetch.get<AuthCodeCheckResponseProps>(`/auth/verify?email=${email}&code=${authCode}`);
