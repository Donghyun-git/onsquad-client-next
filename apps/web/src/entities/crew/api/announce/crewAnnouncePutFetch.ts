import { apiFetch } from '@/shared/api/common';
import type { ResponseModel } from '@/shared/api/model';

export interface CrewAnnouncePutFetchParams {
  crewId: number;
  announceId: number;
  title: string;
  content: string;
}

export type CrewAnnouncePutResponseProps = ResponseModel;

/**
 * 크루 공지사항 수정
 */
export const crewAnnouncePutFetch = ({ crewId, announceId, ...params }: CrewAnnouncePutFetchParams) =>
  apiFetch.put<CrewAnnouncePutResponseProps>(`/crews/${crewId}/announces/${announceId}`, params);
