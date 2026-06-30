import { CrewAnnounceListResponseProps } from '@/entities/crew/api/announce/crewAnnounceGetFetch';
import { CrewDetailResponseProps } from '@/entities/crew/api/crewDetailGetFetch';
import { CrewListResponseProps } from '@/entities/crew/api/crewListGetFetch';
import { CrewHomeInfoResponseProps } from '@/entities/crew/api/home/crewHomeInfoGetFetch';

export type CrewDetailData = PropType<CrewDetailResponseProps, 'data'>;
export type CrewHomeData = PropType<CrewHomeInfoResponseProps, 'data'>;
export type CrewListData = PropType<CrewListResponseProps, 'data'>;
export type CrewAnnounceListData = PropType<CrewAnnounceListResponseProps, 'data'>;
