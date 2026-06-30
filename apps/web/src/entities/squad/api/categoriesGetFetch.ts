import { publicApiFetch } from '@/shared/api/common';
import type { ResponseModel } from '@/shared/api/model';

export interface CategoriesGetFetchResponseProps extends ResponseModel {
  /**
   * 카테고리 목록
   */
  data: string[];
}

/**
 * 카테고리 목록 조회
 * - GET /api/categories
 */
export const categoriesGetFetch = () =>
  publicApiFetch.get<CategoriesGetFetchResponseProps>('/categories');
