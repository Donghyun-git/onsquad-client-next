import { describe, expect, it, vi } from 'vitest';

import { crewQueries } from '@/entities/crew/api/crew.queries';

vi.mock('@/shared/api/crew', () => ({
  crewListGetFetch: vi.fn(),
  crewDetailGetFetch: vi.fn(),
  crewHomeInfoGetFetch: vi.fn(),
  crewAnnounceGetFetch: vi.fn(),
  crewAnnounceDetailGetFetch: vi.fn(),
}));

vi.mock('@/shared/api/crew/manage/crewManageGetFetch', () => ({
  crewManageGetFetch: vi.fn(),
}));

vi.mock('@/shared/api/crew/manage/participants/crewParticipantsGetFetch', () => ({
  crewParticipantsGetFetch: vi.fn(),
}));

vi.mock('@/shared/api/crew/manage/members', () => ({
  crewMembersGetFetch: vi.fn(),
}));

describe('crewQueries', () => {
  describe('root / lists', () => {
    it('root()는 ["crew"]를 반환한다', () => {
      expect(crewQueries.root()).toEqual(['crew']);
    });

    it('lists()는 ["crew", "list"]를 반환한다', () => {
      expect(crewQueries.lists()).toEqual(['crew', 'list']);
    });
  });

  describe('list', () => {
    it('기본값으로 queryKey에 size=10, page=1, crewName=""가 포함된다', () => {
      const opts = crewQueries.list();
      expect(opts.queryKey).toEqual(['crew', 'list', 10, 1, '']);
    });

    it('파라미터를 전달하면 queryKey에 반영된다', () => {
      const opts = crewQueries.list({ size: 5, page: 2, crewName: '테스트크루' });
      expect(opts.queryKey).toEqual(['crew', 'list', 5, 2, '테스트크루']);
    });
  });

  describe('infiniteList', () => {
    it('기본값으로 queryKey에 crewName=""이 포함된다', () => {
      const opts = crewQueries.infiniteList();
      expect(opts.queryKey).toEqual(['crew', 'list', 'infinite', { size: 10, crewName: '' }]);
    });

    it('crewName을 전달하면 queryKey에 반영된다', () => {
      const opts = crewQueries.infiniteList({ crewName: '런닝크루' });
      expect(opts.queryKey).toEqual(['crew', 'list', 'infinite', { size: 10, crewName: '런닝크루' }]);
    });
  });

  describe('detail', () => {
    it('queryKey에 crewId가 포함된다', () => {
      const opts = crewQueries.detail({ crewId: 42 });
      expect(opts.queryKey).toEqual(['crew', 'detail', 42]);
    });
  });

  describe('home', () => {
    it('queryKey에 crewId, page, size가 포함된다', () => {
      const opts = crewQueries.home({ crewId: 1, page: 0, size: 5 });
      expect(opts.queryKey).toEqual(['crew', 'home', 1, 0, 5]);
    });
  });

  describe('announceList', () => {
    it('queryKey에 crewId가 포함된다', () => {
      const opts = crewQueries.announceList({ crewId: 10 });
      expect(opts.queryKey).toEqual(['crew', 'list', 'announce', 10]);
    });
  });

  describe('announceDetail', () => {
    it('queryKey에 crewId와 announceId가 포함된다', () => {
      const opts = crewQueries.announceDetail({ crewId: 10, announceId: 99 });
      expect(opts.queryKey).toEqual(['crew', 'list', 'announce', 10, 99]);
    });
  });

  describe('manage', () => {
    it('queryKey에 crewId가 포함된다', () => {
      const opts = crewQueries.manage({ crewId: 7 });
      expect(opts.queryKey).toEqual(['crew', 'list', 'manage', 7]);
    });
  });

  describe('participants', () => {
    it('기본값으로 queryKey에 size=5, page=0이 포함된다', () => {
      const opts = crewQueries.participants({ crewId: 3 });
      expect(opts.queryKey).toEqual(['crew', 'list', 'participants', 3, 5, 0]);
    });

    it('파라미터를 전달하면 queryKey에 반영된다', () => {
      const opts = crewQueries.participants({ crewId: 3, size: 10, page: 2 });
      expect(opts.queryKey).toEqual(['crew', 'list', 'participants', 3, 10, 2]);
    });
  });

  describe('members (infiniteQueryOptions)', () => {
    it('기본값으로 queryKey에 size=5가 포함된다', () => {
      const opts = crewQueries.members({ crewId: 5 });
      expect(opts.queryKey).toEqual(['crew', 'list', 'members', 5, 5]);
    });

    it('size를 전달하면 queryKey에 반영된다', () => {
      const opts = crewQueries.members({ crewId: 5, size: 20 });
      expect(opts.queryKey).toEqual(['crew', 'list', 'members', 5, 20]);
    });
  });
});
