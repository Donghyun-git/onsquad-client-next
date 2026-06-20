import axios, { type AxiosRequestConfig } from 'axios';

import { useUserStore } from '../lib/store/useUserStore';
import { tokenRefreshGetFetch } from './auth/tokenRefreshGetFetch';
import { ErrorCode } from './model';

type AxiosRequestConfigWithRetry = AxiosRequestConfig & { _retry?: boolean };

export const publicApiFetch = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`,
  headers: { 'Content-Type': 'application/json' },
});

export const apiFetch = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`,
  headers: { 'Content-Type': 'application/json' },
});

// 클라이언트 측 인터셉터
if (typeof window !== 'undefined') {
  apiFetch.interceptors.request.use((config) => {
    const accessToken = useUserStore.getState().user?.accessToken;

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  });

  apiFetch.interceptors.response.use(
    async (response) => {
      const originalRequest = response.config as AxiosRequestConfigWithRetry;

      // T003: HTTP 200이지만 body에 토큰 만료 에러가 담겨 내려오는 경우
      if (response.data?.error?.code !== ErrorCode.T003 || originalRequest._retry) {
        return response;
      }

      originalRequest._retry = true;

      const store = useUserStore.getState();
      const refreshToken = store.user?.refreshToken;

      if (!refreshToken) {
        // const { signOut } = await import('next-auth/react');
        // store.removeUserInfo?.();
        // signOut({ callbackUrl: '/login' });
        return response;
      }

      try {
        const res = await tokenRefreshGetFetch({ refreshToken });

        if (!res.data.success || !res.data.data) {
          throw new Error('refresh failed');
        }

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = res.data.data;

        store.setUserInfo?.({
          ...store.user!,
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        });

        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${newAccessToken}`,
        };

        return apiFetch(originalRequest);
      } catch {
        const { signOut } = await import('next-auth/react');

        store.removeUserInfo?.();

        signOut({ callbackUrl: '/login' });

        return response;
      }
    },
    (error) => Promise.reject(error),
  );
}
// 서버 측 인터셉터
else {
  apiFetch.interceptors.request.use(async (config) => {
    try {
      const { auth } = await import('@/auth');
      const session = await auth();

      if (session?.accessToken) {
        config.headers['Authorization'] = `Bearer ${session.accessToken}`;
      }
    } catch (error) {
      console.error('서버 세션 가져오기 오류:', error);
    }

    return config;
  });

  apiFetch.interceptors.response.use(
    (response) => response,
    (error) => {
      return Promise.reject(error);
    },
  );
}
