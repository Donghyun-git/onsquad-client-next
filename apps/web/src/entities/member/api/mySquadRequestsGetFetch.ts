import { apiFetch } from '@/shared/api/common';
import type { ResponseModel } from '@/shared/api/model';
import type { MySquadRequestItem } from '../types/member.types';

export interface MySquadRequestsGetFetchParams {
  page?: number;
  size?: number;
}
export interface MySquadRequestsGetFetchResponseProps extends ResponseModel {
  data: {
    size: number;
    page: number;
    totalPages: number;
    totalCount: number;
    resultsSize: number;
    results: MySquadRequestItem[];
  };
}

/**
 * 내 스쿼드 신청 내역 조회
 * - GET /api/members/me/squad-requests
 */
export const mySquadRequestsGetFetch = ({ page, size }: MySquadRequestsGetFetchParams = {}) => {
  const params = new URLSearchParams();
  if (page !== undefined) params.append('page', String(page));
  if (size !== undefined) params.append('size', String(size));
  const query = params.toString();
  return apiFetch.get<MySquadRequestsGetFetchResponseProps>(
    `/members/me/squad-requests${query ? `?${query}` : ''}`,
  );
};
