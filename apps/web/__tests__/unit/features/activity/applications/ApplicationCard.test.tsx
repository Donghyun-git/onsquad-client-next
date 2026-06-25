import { afterEach, describe, expect, it, vi } from 'vitest';

import { cleanup, fireEvent, render, screen } from '@testing-library/react';

import type { ApplicationItem } from '@/features/activity/applications/ui/mock';

import ApplicationCard from '@/features/activity/applications/ui/ApplicationCard';

afterEach(() => cleanup());

vi.mock('@/shared/ui/Avatar', () => ({
  Avatar: ({ className }: { className?: string }) => <div data-testid="avatar" className={className} />,
}));

vi.mock('@/shared/ui/Text', () => ({
  Text: {
    xl: ({ children, className }: { children: React.ReactNode; className?: string }) => (
      <span className={className}>{children}</span>
    ),
    xs: ({ children, className }: { children: React.ReactNode; className?: string }) => (
      <span className={className}>{children}</span>
    ),
  },
}));

const makeItem = (overrides?: Partial<ApplicationItem>): ApplicationItem => ({
  id: 1,
  type: 'crew',
  targetId: 10,
  targetName: '테스트 크루',
  ownerName: '홍길동',
  imageUrl: '/images/test.png',
  status: 'progress',
  ...overrides,
});

describe('ApplicationCard', () => {
  it('status가 progress이면 취소하기 버튼과 수락 대기중 버튼이 렌더링된다', () => {
    render(<ApplicationCard item={makeItem({ status: 'progress' })} />);

    expect(screen.getByText('취소하기')).toBeDefined();
    expect(screen.getByText('수락 대기중')).toBeDefined();
  });

  it('status가 accepted이면 합류 완료 텍스트가 렌더링되고 취소하기 버튼은 없다', () => {
    render(<ApplicationCard item={makeItem({ status: 'accepted' })} />);

    expect(screen.getByText('합류 완료')).toBeDefined();
    expect(screen.queryByText('취소하기')).toBeNull();
  });

  it('status가 rejected이면 거절되었습니다. 텍스트와 내역 삭제 버튼이 렌더링된다', () => {
    render(<ApplicationCard item={makeItem({ status: 'rejected' })} />);

    expect(screen.getByText('거절되었습니다.')).toBeDefined();
    expect(screen.getByRole('button', { name: '내역 삭제' })).toBeDefined();
  });

  it('isCanceling이 true이면 취소 버튼이 disabled이고 취소 중... 텍스트가 표시된다', () => {
    render(<ApplicationCard item={makeItem({ status: 'progress' })} isCanceling={true} />);

    expect(screen.getByText('취소 중...')).toBeDefined();

    const cancelBtn = screen.getByText('취소 중...').closest('button');
    expect(cancelBtn).not.toBeNull();
    expect((cancelBtn as HTMLButtonElement).disabled).toBe(true);
  });

  it('isCanceling이 false이면 취소 버튼이 enabled이고 취소하기 텍스트가 표시된다', () => {
    render(<ApplicationCard item={makeItem({ status: 'progress' })} isCanceling={false} />);

    expect(screen.getByText('취소하기')).toBeDefined();

    const cancelBtn = screen.getByText('취소하기').closest('button');
    expect(cancelBtn).not.toBeNull();
    expect((cancelBtn as HTMLButtonElement).disabled).toBe(false);
  });

  it('취소 버튼 클릭 시 onCancel 콜백이 호출된다', () => {
    const onCancel = vi.fn();
    render(<ApplicationCard item={makeItem({ status: 'progress' })} onCancel={onCancel} />);

    const cancelBtn = screen.getByText('취소하기').closest('button') as HTMLButtonElement;
    fireEvent.click(cancelBtn);

    expect(onCancel).toHaveBeenCalled();
  });

  it('targetName과 ownerName이 화면에 렌더링된다', () => {
    render(
      <ApplicationCard
        item={makeItem({ targetName: '런닝크루', ownerName: '김철수' })}
      />,
    );

    expect(screen.getByText('런닝크루')).toBeDefined();
    expect(screen.getByText('김철수')).toBeDefined();
  });

  it('status가 accepted이면 내역 삭제 버튼이 렌더링되지 않는다', () => {
    render(<ApplicationCard item={makeItem({ status: 'accepted' })} />);

    expect(screen.queryByRole('button', { name: '내역 삭제' })).toBeNull();
  });
});
