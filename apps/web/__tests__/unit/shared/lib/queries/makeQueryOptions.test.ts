import { describe, expect, it, vi } from 'vitest';

import type { ApiResponse } from '@/shared/api/common';
import type { ResponseModel } from '@/shared/api/model';
import { makeQueryOptions } from '@/shared/lib/queries/makeQueryOptions';
import { QueryError } from '@/shared/lib/queries/useApiQuery';

interface TestData extends ResponseModel {
  data: { id: number; name: string };
}

const makeSuccessResponse = (payload: TestData['data']): ApiResponse<TestData> => ({
  data: { success: true, status: 200, data: payload },
  headers: new Headers(),
});

const makeErrorResponse = (code: string, message: string): ApiResponse<TestData> => ({
  data: {
    success: false,
    status: 200,
    error: { code, message },
    data: { id: 0, name: '' },
  },
  headers: new Headers(),
});

describe('makeQueryOptions', () => {
  it('queryKey가 그대로 전달된다', () => {
    const queryKey = ['test', 1] as const;
    const options = makeQueryOptions(queryKey, vi.fn());

    expect(options.queryKey).toEqual(['test', 1]);
  });

  it('정상 응답이면 내부 queryFn이 res.data를 반환한다', async () => {
    const payload = { id: 42, name: 'squad' };
    const mockFn = vi.fn().mockResolvedValue(makeSuccessResponse(payload));

    const options = makeQueryOptions(['test'], mockFn);
    const internalQueryFn = options.queryFn as unknown as () => Promise<TestData>;

    const result = await internalQueryFn();

    expect(result).toEqual({ success: true, status: 200, data: payload });
  });

  it('error 응답이면 QueryError를 throw하고 code·message가 일치한다', async () => {
    const mockFn = vi.fn().mockResolvedValue(makeErrorResponse('CRM001', '크루원이 아닙니다'));

    const options = makeQueryOptions(['test'], mockFn);
    const internalQueryFn = options.queryFn as unknown as () => Promise<TestData>;

    await expect(internalQueryFn()).rejects.toSatisfy((err: unknown) => {
      return err instanceof QueryError && err.code === 'CRM001' && err.message === '크루원이 아닙니다';
    });
  });

  it('throwOnError가 true이다', () => {
    const options = makeQueryOptions(['test'], vi.fn());

    expect(options.throwOnError).toBe(false);
  });
});
