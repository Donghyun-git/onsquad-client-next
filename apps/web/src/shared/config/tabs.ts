import { PATH } from './paths';

export const TAB_MENUS = [
  {
    location: PATH.community,
    active: '/icons/search_crew_white.svg',
    inActive: '/icons/search_crew_gray.svg',
    alt: '온스쿼드 크루탐색',
    menu: '크루 탐색',
  },
  {
    location: PATH.root,
    active: '/icons/home_white.svg',
    inActive: '/icons/home_gray.svg',
    alt: '온스쿼드 홈',
    menu: '홈',
  },
  {
    location: PATH.crews,
    active: '/icons/mycrew_white.svg',
    inActive: '/icons/mycrew_gray.svg',
    alt: '온스쿼드 나의 크루',
    menu: '나의 크루',
  },
] as const;
