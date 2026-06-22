import { apiFetch } from '../common';
import type { ResponseModel } from '../model';
import type { MyCrewParticipantItem } from '@/shared/types/member.types';

export interface MyCrewParticipantsGetFetchResponseProps extends ResponseModel {
  /** 내가 참여중인 크루 목록 (페이지네이션 없음) */
  data: MyCrewParticipantItem[];
}

/**
 * 내 참여 크루 목록 조회
 * - GET /api/members/me/crew-participants
 */
export const myCrewParticipantsGetFetch = () =>
  apiFetch.get<MyCrewParticipantsGetFetchResponseProps>(`/members/me/crew-participants`);
