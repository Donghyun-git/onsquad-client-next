'use client';

import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';

import { memberQueries } from '@/entities/member';

import { cn } from '@/shared/lib/utils';

import { useCancelCrewRequestMutation } from '../model/useCancelCrewRequestMutation';
import { useCancelSquadRequestMutation } from '../model/useCancelSquadRequestMutation';
import ApplicationCard from './ApplicationCard';
import { type ApplicationItem } from './mock';

type TabKey = 'crew' | 'squad';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'crew', label: '크루 합류신청' },
  { key: 'squad', label: '스쿼드 합류신청' },
];

const ApplicationList = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('crew');

  const { data: crewData, isLoading: isCrewLoading } = useQuery({
    ...memberQueries.myCrewRequests(),
    enabled: activeTab === 'crew',
  });

  const { data: squadData, isLoading: isSquadLoading } = useQuery({
    ...memberQueries.mySquadRequests(),
    enabled: activeTab === 'squad',
  });

  const crewCancel = useCancelCrewRequestMutation();
  const squadCancel = useCancelSquadRequestMutation();

  // 크루 신청 내역(수락 대기) → 카드 표시 모델로 매핑
  const crewApplications: ApplicationItem[] = (crewData?.data.results ?? []).map((req) => ({
    id: req.id,
    type: 'crew',
    targetId: req.crew.id,
    targetName: req.crew.name,
    ownerName: `${req.crew.owner.nickname} 크루장`,
    imageUrl: req.crew.imageUrl || undefined,
    status: 'progress',
  }));

  // 스쿼드 신청 내역(수락 대기) → 카드 표시 모델로 매핑. (스쿼드는 별도 이미지가 없어 fallback 사용)
  const squadApplications: ApplicationItem[] = (squadData?.data.results ?? []).map((req) => ({
    id: req.id,
    type: 'squad',
    targetId: req.squad.id,
    targetName: req.squad.title,
    ownerName: `${req.squad.leader.nickname} 스쿼드장`,
    status: 'progress',
  }));

  const list = activeTab === 'crew' ? crewApplications : squadApplications;
  const isLoading = activeTab === 'crew' ? isCrewLoading : isSquadLoading;

  // 신청 취소 — 타입별 뮤테이션으로 분기 (대상 id: 크루=crewId, 스쿼드=squadId)
  const handleCancel = (item: ApplicationItem) => {
    if (item.type === 'crew') {
      crewCancel.mutate(item.targetId);
    } else {
      squadCancel.mutate(item.targetId);
    }
  };

  return (
    <div className="flex flex-col gap-s-40 py-s-60">
      {/* 탭 */}
      <div className="flex items-center px-s-40">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              'flex flex-1 items-center justify-center rounded py-2 text-300 font-medium leading-130 text-center tracking-[-0.32px] transition-colors',
              activeTab === tab.key ? 'bg-primary500 text-white' : 'text-grayscale500',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 카드 목록 */}
      <div className="flex flex-col gap-s-40 px-s-40">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-primary500" />
          </div>
        ) : list.length > 0 ? (
          list.map((item) => (
            <ApplicationCard
              key={item.id}
              item={item}
              onCancel={() => handleCancel(item)}
              isCanceling={item.type === 'crew' ? crewCancel.isPending : squadCancel.isPending}
            />
          ))
        ) : (
          <p className="py-12 text-center text-300 text-grayscale500">신청 내역이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default ApplicationList;
