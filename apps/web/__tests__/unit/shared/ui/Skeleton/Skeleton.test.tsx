import { afterEach, describe, expect, it } from 'vitest';

import { cleanup, render } from '@testing-library/react';

import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

afterEach(() => cleanup());

describe('Skeleton', () => {
  it('Skeleton.Base가 animate-pulse 클래스를 가진 div로 렌더링된다', () => {
    const { container } = render(<Skeleton.Base />);

    expect(container.querySelector('.animate-pulse')).toBeDefined();
  });

  it('Skeleton.CrewList count=3 이면 CrewCard가 정확히 3개 렌더링된다', () => {
    const { container } = render(<Skeleton.CrewList count={3} />);

    const cards = container.querySelectorAll('.rounded-2xl.bg-white');
    expect(cards).toHaveLength(3);
  });

  it('Skeleton.CrewList 기본값(count=10)이면 CrewCard가 10개 렌더링된다', () => {
    const { container } = render(<Skeleton.CrewList />);

    const cards = container.querySelectorAll('.rounded-2xl.bg-white');
    expect(cards).toHaveLength(10);
  });
});
