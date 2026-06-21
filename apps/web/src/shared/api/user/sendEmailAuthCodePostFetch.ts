import { publicApiFetch } from '../common';
import { ResponseModel } from '../model';

export interface SendEmailAuthCodeGetFetchParams {
  email: string;
}

export interface SendEmailAuthCodeGetFetchResponse extends ResponseModel {
  data: '';
}

/**
 * 이메일 인증코드 전송
 */
export const sendEmailAuthCodePostFetch = ({ email }: SendEmailAuthCodeGetFetchParams) =>
  publicApiFetch.post<SendEmailAuthCodeGetFetchResponse>(`/auth/send?email=${email}`);
