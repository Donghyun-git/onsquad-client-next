import { apiFetch } from '../common';
import type { PageResponse, ResponseModel } from '../model';
import type { MyCrewParticipantItem } from '@/shared/types/member.types';

export interface MyCrewParticipantsGetFetchResponseProps extends ResponseModel {
  data: PageResponse<MyCrewParticipantItem>;
}

/**
 * 내 참여 크루 목록 조회
 * - GET /api/members/me/crew-participants
 */
export const myCrewParticipantsGetFetch = () =>
  apiFetch.get<MyCrewParticipantsGetFetchResponseProps>(`/members/me/crew-participants`);
