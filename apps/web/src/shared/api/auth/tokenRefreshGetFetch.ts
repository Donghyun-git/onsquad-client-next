import { publicApiFetch } from '../common';
import type { ResponseModel } from '../model';

export interface TokenRefreshGetFetchParams {
  refreshToken: string;
}

/**
 * 백엔드 `RestResponse<JsonWebToken>` 구조.
 * 토큰은 envelope 의 중첩 `data` 안에 있다(`res.data.data.accessToken`).
 */
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
