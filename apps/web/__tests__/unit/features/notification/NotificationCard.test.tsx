import { afterEach, describe, expect, it, vi } from 'vitest';

import { cleanup, fireEvent, render, screen } from '@testing-library/react';

import type { NotificationListItem } from '@/entities/notification';

import NotificationCard from '@/features/notification/list/ui/NotificationCard';

afterEach(() => cleanup());

const makeItem = (overrides?: Partial<NotificationListItem>): NotificationListItem => ({
  id: 1,
  topic: 'USER',
  detail: 'CREW_ACCEPT',
  publisherId: 2,
  receiverId: 3,
  occurredAt: '2024-01-01T00:00:00Z',
  read: false,
  payload: {
    message: '크루 합류가 수락되었습니다.',
    crewId: 10,
    crewName: '런닝크루',
    squadId: undefined,
    squadTitle: undefined,
    requestId: 5,
    commentId: undefined,
    parentId: undefined,
    replyId: undefined,
  },
  ...overrides,
});

describe('NotificationCard', () => {
  it('read가 false이면 안읽음 뱃지가 표시되고 버튼이 enabled이다', () => {
    render(<NotificationCard item={makeItem({ read: false })} />);

    expect(screen.getByLabelText('안읽음')).toBeDefined();

    const readBtn = screen.getByRole('button', { name: /크루 합류가 수락되었습니다/ });
    expect((readBtn as HTMLButtonElement).disabled).toBe(false);
  });

  it('read가 true이면 컨테이너에 bg-white 클래스가 적용되고 버튼이 disabled이다', () => {
    render(
      <NotificationCard
        item={makeItem({
          read: true,
          payload: { message: '크루 합류가 수락되었습니다.' },
        })}
      />,
    );

    const container = screen.getByRole('button', { name: /크루 합류가 수락되었습니다/ }).closest('div');
    expect(container?.className).toContain('bg-white');

    const readBtn = screen.getByRole('button', { name: /크루 합류가 수락되었습니다/ });
    expect((readBtn as HTMLButtonElement).disabled).toBe(true);
  });

  it('isReading이 true이고 read가 false이면 버튼이 disabled이다', () => {
    render(<NotificationCard item={makeItem({ read: false })} isReading={true} />);

    const readBtn = screen.getByRole('button', { name: /크루 합류가 수락되었습니다/ });
    expect((readBtn as HTMLButtonElement).disabled).toBe(true);
  });

  it('payload.crewName이 있으면 crewName이 표시된다', () => {
    render(
      <NotificationCard
        item={makeItem({
          payload: {
            message: '알림 메시지',
            crewName: '런닝크루',
          },
        })}
      />,
    );

    expect(screen.getByText('런닝크루')).toBeDefined();
  });

  it('payload.crewName이 없고 squadTitle이 있으면 squadTitle이 표시된다', () => {
    render(
      <NotificationCard
        item={makeItem({
          payload: {
            message: '스쿼드 알림',
            crewName: undefined,
            squadTitle: '모닝런 스쿼드',
          },
        })}
      />,
    );

    expect(screen.getByText('모닝런 스쿼드')).toBeDefined();
  });

  it('payload.message가 화면에 표시된다', () => {
    render(
      <NotificationCard
        item={makeItem({
          payload: { message: '새로운 댓글이 달렸습니다.' },
        })}
      />,
    );

    expect(screen.getByText('새로운 댓글이 달렸습니다.')).toBeDefined();
  });

  it('read가 false일 때 버튼 클릭 시 onRead 콜백이 호출된다', () => {
    const onRead = vi.fn();
    render(<NotificationCard item={makeItem({ read: false })} onRead={onRead} />);

    const readBtn = screen.getByRole('button', { name: /크루 합류가 수락되었습니다/ });
    fireEvent.click(readBtn);

    expect(onRead).toHaveBeenCalled();
  });

  it('알림 옵션 버튼이 렌더링된다', () => {
    render(<NotificationCard item={makeItem()} />);

    expect(screen.getByRole('button', { name: '알림 옵션' })).toBeDefined();
  });
});
