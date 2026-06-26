import { afterEach, describe, expect, it, vi } from 'vitest';

import { cleanup, fireEvent, render, screen } from '@testing-library/react';

import ActivityPage from '@/pages/activity/ui/ActivityPage';

afterEach(() => cleanup());

vi.mock('@/features/activity/history/ui', () => ({
  NotificationTab: () => <div>NotificationTab</div>,
  HistoryTab: () => <div>HistoryTab</div>,
}));

vi.mock('@/shared/ui/Appbar', () => ({
  Appbar: () => <div>Appbar</div>,
}));

vi.mock('@/shared/ui/Text', () => ({
  Text: {
    base: ({ children, className }: { children: React.ReactNode; className?: string }) => (
      <span className={className}>{children}</span>
    ),
  },
}));

vi.mock('@/shared/lib/utils', () => ({
  cn: (...args: string[]) => args.filter(Boolean).join(' '),
}));

describe('ActivityPage', () => {
  it('초기 렌더링 시 "알림" 탭 버튼이 렌더링된다', () => {
    render(<ActivityPage />);

    expect(screen.getByRole('tab', { name: '알림' })).toBeDefined();
  });

  it('초기 렌더링 시 "알림" 탭의 aria-selected가 true이다', () => {
    render(<ActivityPage />);

    const notificationTab = screen.getByRole('tab', { name: '알림' });
    expect(notificationTab.getAttribute('aria-selected')).toBe('true');
  });

  it('초기 렌더링 시 NotificationTab이 렌더링된다', () => {
    render(<ActivityPage />);

    expect(screen.getByText('NotificationTab')).toBeDefined();
  });

  it('"활동내역" 탭 클릭 시 HistoryTab이 렌더링된다', () => {
    render(<ActivityPage />);

    const historyTab = screen.getByRole('tab', { name: '활동내역' });
    fireEvent.click(historyTab);

    expect(screen.getByText('HistoryTab')).toBeDefined();
  });
});
