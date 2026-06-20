import { useUserStore } from '../lib/store/useUserStore';
import { tokenRefreshGetFetch } from './auth/tokenRefreshGetFetch';
import { ErrorCode, type ResponseModel } from './model';

// 공통 요청 타임아웃 15초 (백엔드 무응답 시 무한 대기 방지)
const REQUEST_TIMEOUT_MS = 15_000;

/**
 * 응답 래퍼. axios 의 `{ data }` 형태를 유지해 기존 호출부(res.data.data)와 호환한다.
 */
export interface ApiResponse<T> {
  data: T;
  /** 응답 헤더(소셜 로그인의 location 등 헤더 기반 응답을 읽기 위함). */
  headers: Headers;
}

interface ApiClientOptions {
  baseUrl: string;
  withAuth: boolean;
}

type RequestOptions = Omit<RequestInit, 'body' | 'method'> & { accessToken?: string };
type InternalRequestOptions = RequestInit & { _retry?: boolean; accessToken?: string };

/**
 * fetch 기반 API 클라이언트.
 * - `withAuth` 인스턴스는 Bearer 토큰 주입(클라: store / 서버: next-auth session)과
 *   T003(만료) 토큰 리프레시·재시도·로그아웃을 처리한다.
 */
class ApiClient {
  private options: ApiClientOptions;

  constructor(options: ApiClientOptions) {
    this.options = options;
  }

  /**
   * 인증 헤더 주입.
   * - 클라이언트: store 토큰을 자동 사용
   * - 서버: 호출자가 명시적으로 넘긴 `accessToken` 만 사용한다.
   *   (fetch 클라이언트가 `auth()`/쿠키를 직접 읽지 않으므로, 인증 fetch가
   *    의도치 않게 페이지를 SSG→SSR 로 강제하지 않는다. 서버에서 인증이 필요하면
   *    호출 페이지가 `auth()` 로 토큰을 받아 명시적으로 주입한다.)
   */
  private getAuthHeaders(accessToken?: string): Record<string, string> {
    if (!this.options.withAuth) return {};

    const token =
      accessToken ?? (typeof window !== 'undefined' ? useUserStore.getState().user?.accessToken : undefined);

    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  private async request<T>(path: string, options: InternalRequestOptions = {}): Promise<ApiResponse<T>> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { accessToken, _retry, ...fetchInit } = options;
    const authHeaders = this.getAuthHeaders(accessToken);

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    let response: Response;

    try {
      response = await fetch(`${this.options.baseUrl}${path}`, {
        signal: controller.signal,
        ...fetchInit,
        headers: {
          'Content-Type': 'application/json',
          ...authHeaders,
          ...fetchInit.headers,
        },
      });
    } finally {
      clearTimeout(timer);
    }

    const body = (await response.json().catch(() => undefined)) as T | undefined;
    const meta = body as ResponseModel | undefined;

    // 2xx 가 아니면 axios 처럼 reject (React Query 가 에러로 처리)
    if (!response.ok) {
      throw new Error(meta?.error?.message ?? `요청 실패 (HTTP ${response.status})`);
    }

    // T003: HTTP 200 이지만 body 에 토큰 만료 에러 → 리프레시 후 1회 재시도 (클라이언트 전용)
    if (
      this.options.withAuth &&
      !options._retry &&
      typeof window !== 'undefined' &&
      meta?.error?.code === ErrorCode.T003
    ) {
      const refreshed = await this.refreshToken();

      if (refreshed) {
        return this.request<T>(path, { ...options, _retry: true });
      }
    }

    return { data: body as T, headers: response.headers };
  }

  /** 토큰 재발급. 실패 시 로그아웃. */
  private async refreshToken(): Promise<boolean> {
    const store = useUserStore.getState();
    const refreshToken = store.user?.refreshToken;

    if (!refreshToken) return false;

    try {
      const res = await tokenRefreshGetFetch({ refreshToken });

      if (!res.data.success || !res.data.data) {
        throw new Error('refresh failed');
      }

      store.setUserInfo?.({
        ...store.user!,
        accessToken: res.data.data.accessToken,
        refreshToken: res.data.data.refreshToken,
      });

      return true;
    } catch {
      const { signOut } = await import('next-auth/react');

      store.removeUserInfo?.();
      signOut({ callbackUrl: '/login' });

      return false;
    }
  }

  get<T>(path: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(path, { ...options, method: 'GET' });
  }

  post<T>(path: string, data?: unknown, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(path, {
      ...options,
      method: 'POST',
      body: data === undefined ? undefined : JSON.stringify(data),
    });
  }

  put<T>(path: string, data?: unknown, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(path, {
      ...options,
      method: 'PUT',
      body: data === undefined ? undefined : JSON.stringify(data),
    });
  }

  patch<T>(path: string, data?: unknown, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(path, {
      ...options,
      method: 'PATCH',
      body: data === undefined ? undefined : JSON.stringify(data),
    });
  }

  delete<T>(path: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(path, { ...options, method: 'DELETE' });
  }
}

export const publicApiFetch = new ApiClient({
  baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`,
  withAuth: false,
});

export const apiFetch = new ApiClient({ baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`, withAuth: true });
