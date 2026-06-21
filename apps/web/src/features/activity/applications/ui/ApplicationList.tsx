'use client';

import { useState } from 'react';

import { cn } from '@/shared/lib/utils';
import { Text } from '@/shared/ui/Text';

import { MOCK_CREW_APPLICATIONS, MOCK_SQUAD_APPLICATIONS } from './mock';
import ApplicationCard from './ApplicationCard';

type TabKey = 'crew' | 'squad';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'crew', label: '크루 합류신청' },
  { key: 'squad', label: '스쿼드 합류신청' },
];

const ApplicationList = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('crew');

  const list = activeTab === 'crew' ? MOCK_CREW_APPLICATIONS : MOCK_SQUAD_APPLICATIONS;

  return (
    <div className="flex flex-col">
      {/* 탭 */}
      <div className="flex bg-white px-s-40">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              'flex flex-1 items-center justify-center py-s-20 transition-colors',
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

      {/* 카드 목록 */}
      <div className="flex flex-col gap-s-40 px-s-40 py-s-60">
        {list.length > 0 ? (
          list.map((item) => <ApplicationCard key={item.id} item={item} />)
        ) : (
          <div className="py-16 text-center text-grayscale500">
            <Text.base>신청 내역이 없습니다.</Text.base>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationList;
