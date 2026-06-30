import { HttpResponse, http } from 'msw';

import type { CrewListResponseProps } from '@/entities/crew/api';
import type { HashTag, Mbti } from '@/shared/api/model';
import type { CrewMemberItem, CrewMembersResponseProps } from '@/entities/crew/api/manage/members';

const BASE = 'http://localhost/api/bff';

export const mockCrewMemberItem: CrewMemberItem = {
  states: { isMe: false, canKick: true, canDelegateOwner: true },
  participateAt: '2024-01-01T00:00:00Z',
  member: { id: 1, nickname: '홍길동', introduce: '반갑습니다', mbti: 'INFP' },
};

export const mockCrewListResult: CrewListResponseProps['data']['results'][0] = {
  id: 1,
  name: '테스트 크루',
  introduce: '크루 소개입니다.',
  detail: '크루 상세 정보입니다.',
  imageUrl: 'https://example.com/image.jpg',
  kakaoLink: 'https://open.kakao.com/test',
  hashtags: ['활발한' as HashTag],
  memberCount: 5,
  owner: {
    id: 10,
    nickname: '크루장',
    introduce: '크루장입니다.',
    mbti: 'ENFP' as Mbti,
  },
};

export const crewHandlers = [
  http.get(`${BASE}/crews/:crewId/members`, () =>
    HttpResponse.json<CrewMembersResponseProps>({
      success: true,
      status: 200,
      data: {
        size: 5,
        page: 0,
        totalPages: 1,
        totalCount: 1,
        resultsSize: 1,
        results: [mockCrewMemberItem],
      },
    }),
  ),

  http.delete(`${BASE}/crews/:crewId/members/:memberId`, () =>
    HttpResponse.json({ success: true, status: 200 }),
  ),

  http.patch(`${BASE}/crews/:crewId/members/:memberId/owner`, () =>
    HttpResponse.json({ success: true, status: 200 }),
  ),

  http.delete(`${BASE}/crews/:crewId/members/me`, () =>
    HttpResponse.json({ success: true, status: 200 }),
  ),

  http.get(`${BASE}/crews`, () =>
    HttpResponse.json<CrewListResponseProps>({
      success: true,
      status: 200,
      data: {
        page: 2,
        size: 10,
        totalPages: 3,
        totalCount: 25,
        resultsSize: 10,
        results: [mockCrewListResult],
      },
    }),
  ),
];
