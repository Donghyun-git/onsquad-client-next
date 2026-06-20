import { apiFetch } from '../../common';
import type { ResponseModel } from '../../model';

export interface AnnouncePinPatchFetchParams {
  crewId: number;
  announceId: number;
  state: boolean;
}

export type AnnouncePinPatchResponseProps = ResponseModel;

/**
 * 공지사항 상단고정 토글
 */
export const announcePinPatchFetch = ({ crewId, announceId, state }: AnnouncePinPatchFetchParams) =>
  apiFetch.patch<AnnouncePinPatchResponseProps>(`/crews/${crewId}/announces/${announceId}/pin?state=${state}`);
