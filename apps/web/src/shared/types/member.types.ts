import type { SquadUserInfo } from '@/shared/types/squad.types';

/** 내 스쿼드(참여/신청) 공통 스쿼드 요약 */
export interface MySquadSummary {
  id: number;
  title: string;
  capacity: number;
  remain: number;
  categories: string[];
  /** 스쿼드 오픈채팅 링크(응답에 없을 수 있음 — 있을 때만 오픈채팅 버튼 노출) */
  kakaoLink?: string;
  leader: SquadUserInfo;
}

/** 크루 그룹 내 개별 참여 스쿼드 항목 */
export interface MySquadParticipantItem {
  states: { isLeader: boolean };
  participateAt: string;
  squad: MySquadSummary;
}

/** 내 참여 스쿼드 - 크루별 그룹 */
export interface MySquadParticipantGroup {
  states: { isOwner: boolean };
  crew: {
    id: number;
    name: string;
    imageUrl: string;
    owner: SquadUserInfo;
    squads: MySquadParticipantItem[];
  };
}

/** 내 참여 크루 항목 (GET /members/me/crew-participants) */
export interface MyCrewParticipantItem {
  states: { isOwner: boolean };
  crew: {
    id: number;
    name: string;
    imageUrl: string;
    owner: SquadUserInfo;
  };
}

/** 내 스쿼드 신청 내역 항목 */
export interface MySquadRequestItem {
  id: number;
  requestAt: string;
  crew: {
    id: number;
    name: string;
    introduce: string;
    kakaoLink: string;
    imageUrl: string;
    owner: SquadUserInfo;
  };
  squad: MySquadSummary;
}
