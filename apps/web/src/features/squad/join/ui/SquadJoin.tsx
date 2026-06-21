'use client';

import { useState } from 'react';

import { MOCK_SQUAD_APPLICATIONS } from '@/entities/squad';

import SquadApplicationCard from './SquadApplicationCard';

type TabType = 'crew' | 'squad';

const SquadJoin = () => {
  const [activeTab, setActiveTab] = useState<TabType>('squad');

  return (
    <div className="flex flex-col gap-4 bg-grayscale50 min-h-screen py-6">
      {/* 탭 */}
      <div className="flex items-center px-4">
        <button
          type="button"
          onClick={() => setActiveTab('crew')}
          className={`flex flex-1 items-center justify-center rounded py-2 text-300 font-medium leading-130 text-center tracking-[-0.32px] ${
            activeTab === 'crew' ? 'bg-primary500 text-white' : 'text-grayscale500'
          }`}
          aria-selected={activeTab === 'crew'}
          role="tab"
        >
          크루 합류신청
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('squad')}
          className={`flex flex-1 items-center justify-center rounded py-2 text-300 font-medium leading-130 text-center tracking-[-0.32px] ${
            activeTab === 'squad' ? 'bg-primary500 text-white' : 'text-grayscale500'
          }`}
          aria-selected={activeTab === 'squad'}
          role="tab"
        >
          스쿼드 합류신청
        </button>
      </div>

      {/* 카드 목록 */}
      <div className="flex flex-col gap-3 px-4">
        {activeTab === 'squad' &&
          MOCK_SQUAD_APPLICATIONS.map((app) => (
            <SquadApplicationCard key={app.id} application={app} />
          ))}
        {activeTab === 'crew' && (
          <p className="py-10 text-center text-300 text-grayscale500">크루 합류신청 내역이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default SquadJoin;
