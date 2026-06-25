import { describe, expect, it, vi } from 'vitest';

import { categoryQueries, squadQueries } from '@/entities/squad/api/squad.queries';

vi.mock('@/shared/api/squad', () => ({
  categoriesGetFetch: vi.fn(),
  crewSquadListGetFetch: vi.fn(),
  squadCommentListGetFetch: vi.fn(),
  squadDetailGetFetch: vi.fn(),
  squadMemberListGetFetch: vi.fn(),
  squadRequestListGetFetch: vi.fn(),
}));

describe('squadQueries', () => {
  describe('root', () => {
    it('root()는 ["squad"]를 반환한다', () => {
      expect(squadQueries.root()).toEqual(['squad']);
    });
  });

  describe('detail', () => {
    it('queryKey에 squadId가 포함된다', () => {
      const opts = squadQueries.detail({ squadId: 10 });
      expect(opts.queryKey).toEqual(['squad', 'detail', 10]);
    });
  });

  describe('crewList', () => {
    it('필수 crewId와 옵셔널 파라미터가 queryKey에 포함된다', () => {
      const opts = squadQueries.crewList({ crewId: 3, category: 'RUNNING', page: 1, size: 10 });
      expect(opts.queryKey).toEqual(['squad', 'crewList', 3, 'RUNNING', 1, 10]);
    });

    it('옵셔널 파라미터 미전달 시 queryKey에 undefined가 포함된다', () => {
      const opts = squadQueries.crewList({ crewId: 3 });
      expect(opts.queryKey).toEqual(['squad', 'crewList', 3, undefined, undefined, undefined]);
    });
  });

  describe('requests', () => {
    it('squadId와 page, size가 queryKey에 포함된다', () => {
      const opts = squadQueries.requests({ squadId: 5, page: 0, size: 20 });
      expect(opts.queryKey).toEqual(['squad', 'requests', 5, 0, 20]);
    });

    it('옵셔널 파라미터 미전달 시 queryKey에 undefined가 포함된다', () => {
      const opts = squadQueries.requests({ squadId: 5 });
      expect(opts.queryKey).toEqual(['squad', 'requests', 5, undefined, undefined]);
    });
  });

  describe('members', () => {
    it('squadId와 page, size가 queryKey에 포함된다', () => {
      const opts = squadQueries.members({ squadId: 7, page: 2, size: 10 });
      expect(opts.queryKey).toEqual(['squad', 'members', 7, 2, 10]);
    });

    it('옵셔널 파라미터 미전달 시 queryKey에 undefined가 포함된다', () => {
      const opts = squadQueries.members({ squadId: 7 });
      expect(opts.queryKey).toEqual(['squad', 'members', 7, undefined, undefined]);
    });
  });

  describe('comments', () => {
    it('squadId와 page, size가 queryKey에 포함된다', () => {
      const opts = squadQueries.comments({ squadId: 9, page: 0, size: 15 });
      expect(opts.queryKey).toEqual(['squad', 'comments', 9, 0, 15]);
    });

    it('옵셔널 파라미터 미전달 시 queryKey에 undefined가 포함된다', () => {
      const opts = squadQueries.comments({ squadId: 9 });
      expect(opts.queryKey).toEqual(['squad', 'comments', 9, undefined, undefined]);
    });
  });
});

describe('categoryQueries', () => {
  describe('list', () => {
    it('queryKey는 ["category"]이다', () => {
      const opts = categoryQueries.list();
      expect(opts.queryKey).toEqual(['category']);
    });
  });
});
