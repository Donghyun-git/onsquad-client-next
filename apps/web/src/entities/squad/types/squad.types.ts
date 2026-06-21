export type SquadCategory = '게임' | '배드민턴' | '테니스' | '풋살' | '축구' | '탁구' | '당구' | '농구' | '야구' | '레저' | '물놀이' | '겨울' | '문화';

export type SquadMemberRole = '크루장' | '매니저' | '일반';

export interface SquadMember {
  id: string;
  nickname: string;
  role: SquadMemberRole;
  profileImageUrl?: string;
  introduce: string;
}

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

export interface SquadApplication {
  id: string;
  squadId: string;
  squadTitle: string;
  crewName: string;
  crewImageUrl?: string;
  category: SquadCategory;
  maxMembers: number;
  currentMembers: number;
  authorNickname: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface SquadComment {
  id: string;
  authorNickname: string;
  authorProfileImageUrl?: string;
  content: string;
  createdAt: string;
}
