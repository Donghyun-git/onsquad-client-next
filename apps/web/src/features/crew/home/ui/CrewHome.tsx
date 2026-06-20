'use client';

import type { CrewHomeData } from '@/entities/crew';

import { CrewHeader } from './CrewHeader';
import { CrewInfoSlider } from './CrewInfoSlider';
import { CrewMemberRanking } from './CrewMemberRanking';
import { CrewSquadList } from './CrewSquadList';

interface CrewHomeProps {
  data?: CrewHomeData;
}

export const CrewHome = ({ data }: CrewHomeProps) => {
  return (
    <div className="-mx-5 -mt-5 min-h-[calc(100dvh-var(--app-header-height))]">
      <CrewHeader crew={data?.crew} canManage={data?.states.canManage} />
      <div className="mt-6">
        <CrewInfoSlider announces={data?.announces} crewInfo={data?.crew} />

        <div className="mx-5 mt-6 flex flex-col items-center gap-6">
          <CrewMemberRanking members={data?.rankers} />
          <CrewSquadList squads={data?.squads} />
        </div>
      </div>
    </div>
  );
};
