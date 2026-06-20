export const PATH = Object.freeze({
  root: '/' as const,
  community: '/community' as const,
  crews: '/crews' as const,
  login: '/login' as const,
  join: '/join' as const,
  addCrew: '/crews/new' as const,
  changePassword: '/change-password' as const,
  profile: '/profile' as const,
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
