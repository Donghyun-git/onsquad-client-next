import { apiFetch } from '@/shared/api/common';
import type { ResponseModel } from '@/shared/api/model';
import type { MySquadParticipantGroup } from '../types/member.types';

export interface MySquadParticipantsGetFetchResponseProps extends ResponseModel {
  /** 크루별로 그룹핑된 내 참여 스쿼드 목록 */
  data: MySquadParticipantGroup[];
}

/**
 * 내 참여 스쿼드 목록 조회 (크루별 그룹)
 * - GET /api/members/me/squad-participants
 */
export const mySquadParticipantsGetFetch = () =>
  apiFetch.get<MySquadParticipantsGetFetchResponseProps>(`/members/me/squad-participants`);
