import type { SquadUserInfo } from '@/entities/squad';

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

/** 내 크루 신청 내역 항목 (GET /members/me/crew-requests) */
export interface MyCrewRequestItem {
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
}

/** 활동 내역 유형 (백엔드 HistoryType enum) */
export type HistoryType =
  | 'CREW_CREATE'
  | 'CREW_REQUEST'
  | 'CREW_ACCEPT'
  | 'CREW_REJECT'
  | 'CREW_CANCEL'
  | 'SQUAD_CREATE'
  | 'SQUAD_REQUEST'
  | 'SQUAD_ACCEPT'
  | 'SQUAD_REJECT'
  | 'SQUAD_CANCEL'
  | 'SQUAD_COMMENT'
  | 'SQUAD_COMMENT_REPLY';

/** 내 활동 내역 항목 (GET /members/me/histories) — 서버가 표시 문구(message)를 완성해 내려준다 */
export interface MyActivityHistoryItem {
  crewId: number;
  type: HistoryType;
  message: string;
  recordedAt: string;
}
