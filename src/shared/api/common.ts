import { auth } from '@/auth';
import axios from 'axios';

// import { getSession } from 'next-auth/react';
import { useUserStore } from '../lib/store/useUserStore';

export const publicApiFetch = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`,
  // baseURL: 'http://172.30.1.36:8080/api',
  headers: { 'Content-Type': 'application/json' },
});

export const apiFetch = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`,
  // baseURL: 'http://172.30.1.36:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 클라이언트 측 인터셉터
if (typeof window !== 'undefined') {
  apiFetch.interceptors.request.use(async (config) => {
    try {
      const session = useUserStore.getState().user;

      // const controller = new AbortController();

      // config.signal = controller.signal;

      // setTimeout(() => controller.abort(), 8000);

      if (session) {
        config.headers['Authorization'] = `Bearer ${session.accessToken}`;
      }
    } catch (error) {
      console.error('클라이언트 세션 가져오기 오류:', error);
    }
    return config;
  });
}
// 서버 측 인터셉터
else {
  apiFetch.interceptors.request.use(async (config) => {
    try {
      const session = await auth();

      // const controller = new AbortController();
      // config.signal = controller.signal;

      // setTimeout(() => controller.abort(), 8000);

      if (session) {
        config.headers['Authorization'] = `Bearer ${session.accessToken}`;
      }
    } catch (error) {
      console.error('서버 세션 가져오기 오류:', error);
    }
    return config;
  });
}
