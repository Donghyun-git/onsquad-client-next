import { apiFetch } from '../common';
import { ResponseModel } from '../model';

export interface SocialLoginGetFetchParams {
  platform: 'kakao' | 'google';
}

export interface SocialLoginResponse {}

/**
 * 소셜 로그인
 * - kakao
 * - google
 */
export const userSocialLoginGetFetch = ({ platform }: SocialLoginGetFetchParams) =>
  apiFetch.get<SocialLoginResponse>(`/login/oauth2/${platform}`);
