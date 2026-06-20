import { publicApiFetch } from '../common';
import type { ResponseModel } from '../model';

export interface TokenRefreshGetFetchParams {
  refreshToken: string;
}

export interface TokenRefreshResponseProps extends ResponseModel {
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

/**
 * 토큰 재발급
 */
export const tokenRefreshGetFetch = ({ refreshToken }: TokenRefreshGetFetchParams) =>
  publicApiFetch.post<TokenRefreshResponseProps>('/auth/reissue', { refreshToken });
