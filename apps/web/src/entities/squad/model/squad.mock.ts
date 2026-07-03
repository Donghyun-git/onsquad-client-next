import type { Squad, SquadNotice } from '../types/squad.types';

export const MOCK_SQUAD: Squad = {
  id: '1',
  title: '고정 겜팟 스쿼드',
  content:
    '고정겜팟 스쿼드 모집합니다.\n\n운영규정\n- 주 2회 이상 참여\n- 비매너 행위 금지\n- 게임 내 욕설 금지',
  category: '게임',
  location: '상관없음',
  locationDetail: '서울 노원구',
  maxMembers: 8,
  currentMembers: 5,
  openChatUrl: 'https://open.kakao.com/o/example',
  authorNickname: '브레멘',
  crewName: '공격적인 음악회 크루',
  createdAt: '2023-01-22',
};

export const MOCK_SQUAD_NOTICES: SquadNotice[] = [
  {
    id: '1',
    title: '크루 규정 안내(신규 크루원 필독)',
    authorNickname: '홍길동',
    authorRole: '크루장',
    createdAt: '2023-01-22',
    isPinned: true,
  },
  {
    id: '2',
    title: '스쿼드 모집 규정 안내',
    authorNickname: '매니저',
    authorRole: '매니저',
    createdAt: '2023-01-22',
    isPinned: true,
  },
  {
    id: '3',
    title: '스쿼드 모집 규정 안내',
    authorNickname: '홍길동',
    authorRole: '크루장',
    createdAt: '2023-01-22',
  },
  {
    id: '4',
    title: '스쿼드 모집 규정 안내',
    authorNickname: '홍길동',
    authorRole: '크루장',
    createdAt: '2023-01-22',
  },
];

export const SQUAD_CATEGORIES: { group: string; items: string[] }[] = [
  { group: '스포츠', items: ['게임', '배드민턴', '테니스', '풋살', '축구', '탁구', '당구', '농구', '야구'] },
  { group: '레저', items: ['등산', '낚시', '캠핑', '자전거', '롤러'] },
  { group: '물놀이', items: ['수영', '서핑', '수상스키', '카약'] },
  { group: '겨울', items: ['스키', '보드', '아이스스케이팅'] },
  { group: '문화', items: ['독서', '영화', '전시', '공연', '요리'] },
];
