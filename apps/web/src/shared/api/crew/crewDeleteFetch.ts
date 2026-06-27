import { apiFetch } from '@/shared/api/common';
import type { ResponseModel } from '@/shared/api/model';

export interface CrewDeleteFetchParams {
  crewId: number;
}

export type CrewDeleteResponseProps = ResponseModel;

/**
 * 크루 삭제
 * - DELETE /api/crews/{crewId}
 */
export const crewDeleteFetch = ({ crewId }: CrewDeleteFetchParams) =>
  apiFetch.delete<CrewDeleteResponseProps>(`/crews/${crewId}`);
