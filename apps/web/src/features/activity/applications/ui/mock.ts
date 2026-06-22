export type ApplicationStatus = 'progress' | 'accepted' | 'rejected';

export type ApplicationItem = {
  id: number;
  type: 'crew' | 'squad';
  /** 취소 대상 식별자 (크루 신청=crewId, 스쿼드 신청=squadId) */
  targetId: number;
  targetName: string;
  ownerName: string;
  imageUrl?: string;
  status: ApplicationStatus;
};
