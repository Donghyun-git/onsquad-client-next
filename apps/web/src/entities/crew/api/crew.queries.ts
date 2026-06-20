import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';

import {
  type CrewAnnounceDetailGetFetchParams,
  type CrewAnnounceGetFetchParams,
  type CrewDetailGetFetchParams,
  type CrewHomeInfoGetFetchParams,
  type CrewListGetFetchParams,
  crewAnnounceDetailGetFetch,
  crewAnnounceGetFetch,
  crewDetailGetFetch,
  crewHomeInfoGetFetch,
  crewListGetFetch,
  myCrewListGetFetch,
} from '@/shared/api/crew';
import { CrewManageGetFetchParams, crewManageGetFetch } from '@/shared/api/crew/manage/crewManageGetFetch';
import {
  CrewParticipantsGetFetchParams,
  crewParticipantsGetFetch,
} from '@/shared/api/crew/manage/participants/crewParticipantsGetFetch';
import { makeQueryOptions } from '@/shared/lib/queries/makeQueryOptions';

export const crewQueries = {
  root: () => ['crew'],
  lists: () => [...crewQueries.root(), 'list'],
  list: ({ size = 10, page = 1, crewName = '' }: CrewListGetFetchParams = {}) =>
    queryOptions({
      queryKey: [...crewQueries.lists(), size, page, crewName],
      queryFn: async () => {
        const res = await crewListGetFetch({ size, page, crewName });

        return res.data.data;
      },
    }),

  infiniteList: ({ crewName = '' }: Pick<CrewListGetFetchParams, 'crewName'> = {}) =>
    infiniteQueryOptions({
      queryKey: [...crewQueries.lists(), 'infinite', { size: 10, crewName }],
      queryFn: async ({ pageParam }) => {
        const res = await crewListGetFetch({
          size: 10,
          page: pageParam,
          crewName,
        });
        return {
          data: res.data.data,
          nextPage: res.data.data.resultsSize === 10 ? pageParam + 1 : undefined,
        };
      },
      getNextPageParam: (lastPage) => lastPage.nextPage,
      initialPageParam: crewName ? 1 : 2,
    }),

  myCrewList: () =>
    queryOptions({
      queryKey: [...crewQueries.lists(), 'my'],
      queryFn: async () => {
        const res = await myCrewListGetFetch();

        if (res.data.error) {
          throw new Error(res.data.error.message);
        }

        return res.data.data;
      },
    }),

  detail: ({ crewId }: CrewDetailGetFetchParams) =>
    makeQueryOptions([...crewQueries.root(), 'detail', crewId], () => crewDetailGetFetch({ crewId })),

  home: ({ crewId, page, size }: CrewHomeInfoGetFetchParams) =>
    makeQueryOptions([...crewQueries.root(), 'home', crewId, page, size], () =>
      crewHomeInfoGetFetch({ crewId, page, size }),
    ),

  announceList: ({ crewId }: CrewAnnounceGetFetchParams) =>
    makeQueryOptions([...crewQueries.lists(), 'announce', crewId], () => crewAnnounceGetFetch({ crewId })),

  announceDetail: ({ crewId, announceId }: CrewAnnounceDetailGetFetchParams) =>
    makeQueryOptions([...crewQueries.lists(), 'announce', crewId, announceId], () =>
      crewAnnounceDetailGetFetch({ crewId, announceId }),
    ),

  manage: ({ crewId }: CrewManageGetFetchParams) =>
    makeQueryOptions([...crewQueries.lists(), 'manage', crewId], () => crewManageGetFetch({ crewId })),

  participants: ({ crewId, size = 5, page = 0 }: CrewParticipantsGetFetchParams) =>
    makeQueryOptions([...crewQueries.lists(), 'participants', crewId, size, page], () =>
      crewParticipantsGetFetch({ crewId, size, page }),
    ),
};
