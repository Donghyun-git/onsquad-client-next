import { describe, expect, it } from 'vitest';

import { getRoleText } from '@/shared/lib/utils/getRoleText';

describe('getRoleText', () => {
  it('OWNER는 "크루장"을 반환한다', () => {
    expect(getRoleText('OWNER')).toBe('크루장');
  });

  it('GENERAL은 "일반"을 반환한다', () => {
    expect(getRoleText('GENERAL')).toBe('일반');
  });

  it('MANAGER는 "관리자"를 반환한다', () => {
    expect(getRoleText('MANAGER')).toBe('관리자');
  });

  it('LEADER는 "리더"를 반환한다', () => {
    expect(getRoleText('LEADER')).toBe('리더');
  });

  it('undefined는 "멤버"를 반환한다', () => {
    expect(getRoleText(undefined)).toBe('멤버');
  });

  it('알 수 없는 값은 "멤버"를 반환한다', () => {
    expect(getRoleText('UNKNOWN' as never)).toBe('멤버');
  });
});
