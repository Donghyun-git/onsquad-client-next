export type ApplicationStatus = 'progress' | 'accepted' | 'rejected';

export type ApplicationItem = {
  id: number;
  type: 'crew' | 'squad';
  targetName: string;
  ownerName: string;
  imageUrl?: string;
  status: ApplicationStatus;
};

export const MOCK_CREW_APPLICATIONS: ApplicationItem[] = [
  {
    id: 1,
    type: 'crew',
    targetName: '공격적인 음악회 크루',
    ownerName: '홍길동 크루장',
    status: 'progress',
  },
  {
    id: 2,
    type: 'crew',
    targetName: '공격적인 음악회 크루',
    ownerName: '홍길동 크루장',
    status: 'rejected',
  },
];

export const MOCK_SQUAD_APPLICATIONS: ApplicationItem[] = [
  {
    id: 3,
    type: 'squad',
    targetName: '기타 앙상블 스쿼드',
    ownerName: '이경학 스쿼드장',
    status: 'progress',
  },
  {
    id: 4,
    type: 'squad',
    targetName: '재즈 클럽 스쿼드',
    ownerName: '김민준 스쿼드장',
    status: 'accepted',
  },
];
