import { describe, expect, it, vi } from 'vitest';

import { memberQueries } from '@/entities/member/api/member.queries';

vi.mock('@/entities/member/api', () => ({
  myCrewParticipantsGetFetch: vi.fn(),
  mySquadParticipantsGetFetch: vi.fn(),
  mySquadRequestsGetFetch: vi.fn(),
  myCrewRequestsGetFetch: vi.fn(),
  myHistoriesGetFetch: vi.fn(),
}));

describe('memberQueries', () => {
  describe('root', () => {
    it('root()는 ["member"]를 반환한다', () => {
      expect(memberQueries.root()).toEqual(['member']);
    });
  });

  describe('myCrewParticipants', () => {
    it('queryKey는 ["member", "myCrewParticipants"]이다', () => {
      const opts = memberQueries.myCrewParticipants();
      expect(opts.queryKey).toEqual(['member', 'myCrewParticipants']);
    });
  });

  describe('mySquadParticipants', () => {
    it('queryKey는 ["member", "mySquadParticipants"]이다', () => {
      const opts = memberQueries.mySquadParticipants();
      expect(opts.queryKey).toEqual(['member', 'mySquadParticipants']);
    });
  });

  describe('mySquadRequests', () => {
    it('파라미터 없이 호출하면 queryKey에 undefined가 포함된다', () => {
      const opts = memberQueries.mySquadRequests();
      expect(opts.queryKey).toEqual(['member', 'mySquadRequests', undefined, undefined]);
    });

    it('page와 size를 전달하면 queryKey에 반영된다', () => {
      const opts = memberQueries.mySquadRequests({ page: 1, size: 10 });
      expect(opts.queryKey).toEqual(['member', 'mySquadRequests', 1, 10]);
    });
  });

  describe('myCrewRequests', () => {
    it('파라미터 없이 호출하면 queryKey에 undefined가 포함된다', () => {
      const opts = memberQueries.myCrewRequests();
      expect(opts.queryKey).toEqual(['member', 'myCrewRequests', undefined, undefined]);
    });

    it('page와 size를 전달하면 queryKey에 반영된다', () => {
      const opts = memberQueries.myCrewRequests({ page: 2, size: 5 });
      expect(opts.queryKey).toEqual(['member', 'myCrewRequests', 2, 5]);
    });
  });

  describe('histories', () => {
    it('params 객체 전체가 queryKey에 포함된다', () => {
      const params = { from: '2024-01-01', to: '2024-12-31', page: 0, size: 10 };
      const opts = memberQueries.histories(params);
      expect(opts.queryKey).toEqual(['member', 'histories', params]);
    });
  });
});
