import { apiFetch } from '@/shared/api/common';
import { ResponseModel } from '@/shared/api/model';

export interface CrewAnnouncePostFetchParams {
  crewId: number;
  title: string;
  content: string;
}

export type CrewAnnouncePostResponseProps = ResponseModel;

/**
 * 크루 공지사항 등록
 */
export const crewAnnouncePostFetch = ({ crewId, ...params }: CrewAnnouncePostFetchParams) =>
  apiFetch.post<CrewAnnouncePostResponseProps>(`/crews/${crewId}/announces`, params);
