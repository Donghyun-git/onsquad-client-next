'use client';

import { useState } from 'react';

import { cn } from '@/shared/lib/utils';
import { Text } from '@/shared/ui/Text';

import { HistoryTab, NotificationTab } from '@/features/activity/history/ui';

type TabKey = 'notification' | 'history';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'notification', label: '알림' },
  { key: 'history', label: '활동내역' },
];

export const ActivityTabs = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('notification');

  return (
    <div className="pt-14">
      {/* 탭 헤더 */}
      <div className="flex border-b border-grayscale100 bg-white">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              'flex flex-1 items-center justify-center py-s-30 transition-colors',
              activeTab === tab.key
                ? 'border-b-2 border-primary500 text-primary500'
                : 'text-grayscale500',
            )}
          >
            <Text.base className={cn('font-medium', activeTab === tab.key && 'font-semibold')}>
              {tab.label}
            </Text.base>
          </button>
        ))}
      </div>

      {/* 탭 콘텐츠 */}
      <div className="min-h-screen bg-grayscale50">
        {activeTab === 'notification' ? <NotificationTab /> : <HistoryTab />}
      </div>
    </div>
  );
};
