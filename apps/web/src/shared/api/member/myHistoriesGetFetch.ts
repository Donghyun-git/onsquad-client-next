import type { HistoryType, MyActivityHistoryItem } from '@/shared/types/member.types';

import { apiFetch } from '../common';
import type { ResponseModel } from '../model';

export interface MyHistoriesGetFetchParams {
  /** 조회 시작 날짜 (yyyy-MM-dd) */
  from: string;
  /** 조회 종료 날짜 (yyyy-MM-dd) */
  to: string;
  type?: HistoryType;
  page?: number;
  size?: number;
}
export interface MyHistoriesGetFetchResponseProps extends ResponseModel {
  data: {
    size: number;
    page: number;
    totalPages: number;
    totalCount: number;
    resultsSize: number;
    results: MyActivityHistoryItem[];
  };
}

/**
 * 내 활동 내역(히스토리) 조회
 * - GET /api/members/me/histories (from·to 필수)
 */
export const myHistoriesGetFetch = ({ from, to, type, page, size }: MyHistoriesGetFetchParams) => {
  const params = new URLSearchParams({ from, to });
  if (type !== undefined) params.append('type', type);
  if (page !== undefined) params.append('page', String(page));
  if (size !== undefined) params.append('size', String(size));
  return apiFetch.get<MyHistoriesGetFetchResponseProps>(`/members/me/histories?${params.toString()}`);
};
