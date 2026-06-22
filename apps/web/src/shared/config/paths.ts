export const PATH = Object.freeze({
  root: '/' as const,
  community: '/community' as const,
  crews: '/crews' as const,
  login: '/login' as const,
  join: '/join' as const,
  addCrew: '/crews/new' as const,
  changePassword: '/change-password' as const,
  profile: '/profile' as const,
  notifications: '/notifications' as const,
  // 스쿼드 도메인 (feat/squad)
  addSquad: '/squads/new' as const,
  // 내 활동 도메인 (feat/my-activity)
  activity: '/activity' as const,
  mySquads: '/my-squads' as const,
  myApplications: '/my/applications' as const,
  myCrews: '/my/crews' as const,
});

// 동적 라우트 빌더 (도메인 화면에서 사용)
export const SQUAD_PATH = Object.freeze({
  detail: (id: string | number) => `/squads/${id}` as const,
  recruit: (id: string | number) => `/squads/${id}/recruit` as const,
  members: (id: string | number) => `/squads/${id}/members` as const,
  join: (id: string | number) => `/squads/${id}/join` as const,
});

export const BOTTOMTAB_PATH = Object.freeze({
  root: '/' as const,
  community: '/community' as const,
  crews: '/crews' as const,
});

export const ROOT_PATH = {
  root: '/:params' as const,
  main: '' as const,
  community: 'community' as const,
  crews: 'crews' as const,
  login: 'login' as const,
  join: 'join' as const,
};

export const CREW_PATH = {
  announce: 'announce' as const,
};
