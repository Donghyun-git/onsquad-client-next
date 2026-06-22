import type { MyCrewRequestItem } from '@/shared/types/member.types';

import { apiFetch } from '../common';
import type { ResponseModel } from '../model';

export interface MyCrewRequestsGetFetchParams {
  page?: number;
  size?: number;
}
export interface MyCrewRequestsGetFetchResponseProps extends ResponseModel {
  data: {
    size: number;
    page: number;
    totalPages: number;
    totalCount: number;
    resultsSize: number;
    results: MyCrewRequestItem[];
  };
}

/**
 * 내 크루 신청 내역 조회
 * - GET /api/members/me/crew-requests
 */
export const myCrewRequestsGetFetch = ({ page, size }: MyCrewRequestsGetFetchParams = {}) => {
  const params = new URLSearchParams();
  if (page !== undefined) params.append('page', String(page));
  if (size !== undefined) params.append('size', String(size));
  const query = params.toString();
  return apiFetch.get<MyCrewRequestsGetFetchResponseProps>(`/members/me/crew-requests${query ? `?${query}` : ''}`);
};
