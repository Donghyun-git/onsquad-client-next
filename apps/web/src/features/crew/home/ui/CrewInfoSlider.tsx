'use client';

import type { CrewHomeInfoResponseProps } from '@/shared/api/crew/home/crewHomeInfoGetFetch';
import { Slider } from '@/shared/ui/Slider';

import { CrewAnnounceList } from './CrewAnnounceList';
import { CrewInfoSection } from './CrewInfoSection';

interface CrewInfoSliderProps {
  announces?: PropType<PropType<CrewHomeInfoResponseProps, 'data'>, 'announces'>;
  crewInfo?: PropType<PropType<CrewHomeInfoResponseProps, 'data'>, 'crew'>;
}

export const CrewInfoSlider = ({ announces, crewInfo }: CrewInfoSliderProps) => {
  return (
    <Slider
      slot={[
        <CrewAnnounceList key="notice" announces={announces} crewId={crewInfo?.id} />,
        <CrewInfoSection key="info" crew={crewInfo} />,
      ]}
    />
  );
};
