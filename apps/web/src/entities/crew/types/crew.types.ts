import { CrewAnnounceListResponseProps } from '@/shared/api/crew/announce/crewAnnounceGetFetch';
import { CrewDetailResponseProps } from '@/shared/api/crew/crewDetailGetFetch';
import { CrewListResponseProps } from '@/shared/api/crew/crewListGetFetch';
import { CrewHomeInfoResponseProps } from '@/shared/api/crew/home/crewHomeInfoGetFetch';

export type CrewDetailData = PropType<CrewDetailResponseProps, 'data'>;
export type CrewHomeData = PropType<CrewHomeInfoResponseProps, 'data'>;
export type CrewListData = PropType<CrewListResponseProps, 'data'>;
export type CrewAnnounceListData = PropType<CrewAnnounceListResponseProps, 'data'>;
