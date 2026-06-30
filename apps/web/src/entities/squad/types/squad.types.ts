export type SquadCategory = '게임' | '배드민턴' | '테니스' | '풋살' | '축구' | '탁구' | '당구' | '농구' | '야구' | '레저' | '물놀이' | '겨울' | '문화';

export type SquadMemberRole = '크루장' | '매니저' | '일반';

export interface SquadNotice {
  id: string;
  title: string;
  authorNickname: string;
  authorRole: SquadMemberRole;
  authorProfileImageUrl?: string;
  createdAt: string;
  isPinned?: boolean;
}

export interface Squad {
  id: string;
  title: string;
  content: string;
  category: SquadCategory;
  location: string;
  locationDetail?: string;
  maxMembers: number;
  currentMembers: number;
  openChatUrl: string;
  authorNickname: string;
  authorProfileImageUrl?: string;
  crewName: string;
  crewImageUrl?: string;
  createdAt: string;
}

// --- API 레이어 타입 ---

import type { Mbti } from '@/shared/api/model';

export interface SquadUserInfo {
  /** 유저 pk */
  id: number;
  /** 닉네임 */
  nickname: string;
  /** 자기소개 */
  introduce: string;
  /** mbti */
  mbti: Mbti | '';
}

export interface SquadDetailStates {
  /** 이미 참여 중 여부 */
  alreadyParticipant: boolean;
  /** 이미 신청 중 여부 */
  alreadyRequest?: boolean;
  /** 리더 여부 */
  isLeader?: boolean;
  /** 참여자 목록 열람 가능 여부 */
  canSeeParticipants: boolean;
  /** 탈퇴 가능 여부 */
  canLeave?: boolean;
  /** 삭제 가능 여부 */
  canDelete: boolean;
}

export interface SquadDetailData {
  /** 상태 정보 */
  states: SquadDetailStates;
  /** 스쿼드 pk */
  id: number;
  /** 스쿼드 제목 */
  title: string;
  /** 스쿼드 설명 */
  content: string;
  /** 모집 인원 */
  capacity: number;
  /** 남은 자리 */
  remain: number;
  /** 모임 주소 */
  address: string;
  /** 모임 상세 주소 */
  addressDetail: string;
  /** 카카오 오픈채팅 링크 */
  kakaoLink: string;
  /** 디스코드 초대 링크 */
  discordLink: string;
  /** 모집 카테고리 목록 */
  categories: string[];
  /** 스쿼드 리더 정보 */
  leader: SquadUserInfo;
}

export type SquadListItem = Omit<SquadDetailData, 'states'>;

export interface CreateSquadBody {
  /** 스쿼드 제목 */
  title: string;
  /** 스쿼드 설명 */
  content: string;
  /** 모집 인원 */
  capacity: number;
  /** 모임 주소 */
  address: string;
  /** 모임 상세 주소 */
  addressDetail: string;
  /** 모집 카테고리 목록 */
  categories: string[];
  /** 카카오 오픈채팅 링크 */
  kakaoLink: string;
  /** 디스코드 초대 링크 */
  discordLink: string;
}

export interface SquadRequestItem {
  /** 신청 pk */
  id: number;
  /** 신청 일시 */
  requestAt: string;
  /** 신청자 정보 */
  requester: SquadUserInfo;
}

export interface SquadParticipantItem {
  /** 상태 정보 */
  states: {
    /** 본인 여부 */
    isMe: boolean;
    /** 강퇴 가능 여부 */
    canKick: boolean;
    /** 리더 위임 가능 여부 */
    canDelegateLeader: boolean;
  };
  /** 참여 일시 */
  participateAt: string;
  /** 참여자 정보 */
  member: SquadUserInfo;
}

export interface SquadCommentItem {
  /** 권한 상태 (canDelete: 수정/삭제 권한 — 본인 댓글 여부) */
  states: { canDelete: boolean };
  /** 댓글 pk */
  id: number;
  /** 삭제 여부 */
  deleted: boolean;
  /** 댓글 내용 (삭제 시 "삭제된 댓글입니다.") */
  content: string;
  /** 작성 일시 (삭제 안 된 경우만) */
  createdAt?: string;
  /** 수정 일시 (삭제 안 된 경우만) */
  updatedAt?: string;
  /** 삭제 일시 (삭제된 경우만) */
  deletedAt?: string;
  /** 작성자 정보 (삭제 안 된 경우만) */
  writer?: SquadUserInfo;
  /** 대댓글 목록 (1단계 중첩) */
  replies: SquadCommentItem[];
}
