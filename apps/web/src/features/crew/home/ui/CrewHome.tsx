'use client';

import { useQuery } from '@tanstack/react-query';

import { crewQueries } from '@/entities/crew';

import { CrewHeader } from './CrewHeader';
import { CrewInfoSlider } from './CrewInfoSlider';
import { CrewMemberRanking } from './CrewMemberRanking';
import { CrewSquadList } from './CrewSquadList';

interface CrewHomeProps {
  crewId: number;
}

export const CrewHome = ({ crewId }: CrewHomeProps) => {
  // 인증 데이터: 클라에서 BFF 경유로 조회 (회전 토큰 refresh·persist 는 서버 BFF 처리)
  const { data: home } = useQuery(crewQueries.home({ crewId, page: 1, size: 10 }));

  const data = home?.data;

  return (
    <div className="-mx-5 -mt-5 min-h-[calc(100dvh-var(--app-header-height))]">
      <CrewHeader crew={data?.crew} canManage={data?.states.canManage} />
      <div className="mt-6">
        <CrewInfoSlider announces={data?.announces} crewInfo={data?.crew} />

        <div className="mx-5 mt-6 flex flex-col items-center gap-6">
          <CrewMemberRanking members={data?.rankers} />
          <CrewSquadList squads={data?.squads} crewId={crewId} />
        </div>
      </div>
    </div>
  );
};
