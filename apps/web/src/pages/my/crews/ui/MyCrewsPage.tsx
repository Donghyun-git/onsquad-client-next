'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { memberQueries } from '@/entities/member';
import { Appbar } from '@/shared/ui/Appbar';

import MyCrewCard from './MyCrewCard';
import MySquadGroup from './MySquadGroup';

// 내가 크루장(owner)인 항목을 상단으로. (날짜 필드는 DTO에 없어 그 외 순서는 API 순서 유지)
const ownerFirst = <T extends { states: { isOwner: boolean } }>(arr: T[]) =>
  [...arr].sort((a, b) => Number(b.states.isOwner) - Number(a.states.isOwner));

const MyCrewsPage = () => {
  const [activeTab, setActiveTab] = useState<'crew' | 'squad'>('crew');

  const { data: crewData } = useQuery(memberQueries.myCrewParticipants());
  const crews = crewData?.data ?? [];

  const { data: squadData } = useQuery(memberQueries.mySquadParticipants());
  const groups = squadData?.data ?? [];

  return (
    <>
      <Appbar isMenuHeader={false} title="내 크루" />
      <div className="min-h-screen bg-grayscale50 pt-14">
        <div className="flex flex-col gap-s-40 py-s-60">
          <div className="flex items-center px-s-40">
            <button
              type="button"
              onClick={() => setActiveTab('crew')}
              className={`flex flex-1 items-center justify-center rounded py-2 text-300 font-medium leading-130 text-center tracking-[-0.32px] ${
                activeTab === 'crew' ? 'bg-primary500 text-white' : 'text-grayscale500'
              }`}
              aria-selected={activeTab === 'crew'}
              role="tab"
            >
              참여중인 크루
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
              참여중인 스쿼드
            </button>
          </div>

          {activeTab === 'crew' && (
            <div className="flex flex-col gap-s-30 px-s-40">
              {crews.length > 0 ? (
                ownerFirst(crews).map((item) => <MyCrewCard key={item.crew.id} item={item} />)
              ) : (
                <p className="py-12 text-center text-300 text-grayscale500">참여중인 크루가 없습니다.</p>
              )}
            </div>
          )}

          {activeTab === 'squad' && (
            <div className="flex flex-col gap-s-30 px-s-40">
              {groups.length > 0 ? (
                ownerFirst(groups).map((group) => <MySquadGroup key={group.crew.id} group={group} />)
              ) : (
                <p className="py-12 text-center text-300 text-grayscale500">참여중인 스쿼드가 없습니다.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyCrewsPage;
