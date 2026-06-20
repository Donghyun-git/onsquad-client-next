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

  detail: ({ crewId, accessToken }: CrewDetailGetFetchParams) =>
    queryOptions({
      queryKey: [...crewQueries.root(), 'detail', crewId],
      queryFn: async () => {
        const res = await crewDetailGetFetch({ crewId, accessToken });

        console.log(res.data, 'res.data');

        return res.data.data;
      },
      throwOnError: true,
    }),

  home: ({ crewId, page, size, accessToken }: CrewHomeInfoGetFetchParams) =>
    makeQueryOptions([...crewQueries.root(), 'home', crewId, page, size], () =>
      crewHomeInfoGetFetch({ crewId, page, size, accessToken }),
    ),

  announceList: ({ crewId, accessToken }: CrewAnnounceGetFetchParams) =>
    queryOptions({
      queryKey: [...crewQueries.lists(), 'announce', crewId],
      queryFn: async () => {
        const res = await crewAnnounceGetFetch({ crewId, accessToken });

        return res.data;
      },
    }),

  announceDetail: ({ crewId, announceId, accessToken }: CrewAnnounceDetailGetFetchParams) =>
    queryOptions({
      queryKey: [...crewQueries.lists(), 'announce', crewId, announceId],
      queryFn: async () => {
        const res = await crewAnnounceDetailGetFetch({ crewId, announceId, accessToken });

        return res.data.data;
      },
    }),

  manage: ({ crewId, accessToken }: CrewManageGetFetchParams) =>
    queryOptions({
      queryKey: [...crewQueries.lists(), 'manage', crewId],
      queryFn: async () => {
        const res = await crewManageGetFetch({ crewId, accessToken });

        return res.data.data;
      },
    }),

  participants: ({ crewId, size = 5, page = 0, accessToken }: CrewParticipantsGetFetchParams) =>
    makeQueryOptions([...crewQueries.lists(), 'participants', crewId, size, page], () =>
      crewParticipantsGetFetch({ crewId, size, page, accessToken }),
    ),
};
