import { http, HttpResponse } from 'msw';

import type { CrewMemberItem, CrewMembersResponseProps } from '@/shared/api/crew/manage/members';

const BASE = 'http://localhost/api/bff';

export const mockCrewMemberItem: CrewMemberItem = {
  states: { isMe: false, canKick: true, canDelegateOwner: true },
  participateAt: '2024-01-01T00:00:00Z',
  member: { id: 1, nickname: '홍길동', introduce: '반갑습니다', mbti: 'INFP' },
};

export const crewHandlers = [
  http.get(`${BASE}/crews/:crewId/members`, () => {
    return HttpResponse.json<CrewMembersResponseProps>({
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
    });
  }),

  http.delete(`${BASE}/crews/:crewId/members/:memberId`, () => {
    return HttpResponse.json({ success: true, status: 200 });
  }),

  http.patch(`${BASE}/crews/:crewId/members/:memberId/owner`, () => {
    return HttpResponse.json({ success: true, status: 200 });
  }),
];
