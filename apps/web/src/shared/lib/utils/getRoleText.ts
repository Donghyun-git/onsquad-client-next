import type { CrewRole, SquadRole } from '@/shared/types';

export const getRoleText = (role?: CrewRole | SquadRole) => {
  switch (role) {
    case 'OWNER':
      return '크루장';
    case 'GENERAL':
      return '일반';
    case 'MANAGER':
      return '관리자';
    case 'LEADER':
      return '리더';
    default:
      return '멤버';
  }
};
