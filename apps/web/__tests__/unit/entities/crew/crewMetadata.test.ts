import { afterEach, describe, expect, it, vi } from 'vitest';

const getMock = vi.fn();
vi.mock('@/shared/api/common', () => ({
  publicApiFetch: { get: (...args: unknown[]) => getMock(...args) },
}));

import { buildCrewMetadata } from '@/entities/crew/api/crewMetadata';

afterEach(() => getMock.mockReset());

describe('buildCrewMetadata', () => {
  it('성공 시 크루 이름을 title 로 사용한다', async () => {
    getMock.mockResolvedValue({ data: { success: true, data: { name: '런닝크루', introduce: '같이 달려요' } } });
    const meta = await buildCrewMetadata(1);
    expect(getMock).toHaveBeenCalledWith('/crews/1');
    expect(meta.title).toContain('런닝크루');
    expect(meta.description).toBe('같이 달려요');
  });

  it('success:false 본문(401 등) 이면 fallback 을 반환한다', async () => {
    getMock.mockResolvedValue({ data: { success: false, error: { code: 'T004' } } });
    const meta = await buildCrewMetadata(1);
    expect(meta.title).toBe('크루 | OnSquad');
  });

  it('throw 시 fallback 을 반환한다', async () => {
    getMock.mockRejectedValue(new Error('network'));
    const meta = await buildCrewMetadata(1);
    expect(meta.title).toBe('크루 | OnSquad');
  });
});
