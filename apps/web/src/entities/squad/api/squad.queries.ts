import { infiniteQueryOptions } from '@tanstack/react-query';

import {
  categoriesGetFetch,
  crewSquadListGetFetch,
  crewSquadManageListGetFetch,
  squadCommentListGetFetch,
  squadDetailGetFetch,
  squadMemberListGetFetch,
  squadRequestListGetFetch,
} from '@/entities/squad/api';
import { makeQueryOptions } from '@/shared/lib/queries/makeQueryOptions';

export const squadQueries = {
  root: () => ['squad'],

  detail: ({ squadId }: { squadId: number }) =>
    makeQueryOptions([...squadQueries.root(), 'detail', squadId], () => squadDetailGetFetch({ squadId })),

  crewList: ({ crewId, category, page, size }: { crewId: number; category?: string; page?: number; size?: number }) =>
    makeQueryOptions([...squadQueries.root(), 'crewList', crewId, category, page, size], () =>
      crewSquadListGetFetch({ crewId, category, page, size }),
    ),

  requests: ({ squadId, page, size }: { squadId: number; page?: number; size?: number }) =>
    makeQueryOptions([...squadQueries.root(), 'requests', squadId, page, size], () =>
      squadRequestListGetFetch({ squadId, page, size }),
    ),

  members: ({ squadId, page, size }: { squadId: number; page?: number; size?: number }) =>
    makeQueryOptions([...squadQueries.root(), 'members', squadId, page, size], () =>
      squadMemberListGetFetch({ squadId, page, size }),
    ),

  manageList: ({ crewId, size = 5 }: { crewId: number; size?: number }) =>
    infiniteQueryOptions({
      queryKey: [...squadQueries.root(), 'manageList', crewId, size],
      queryFn: async ({ pageParam }) => {
        const res = await crewSquadManageListGetFetch({ crewId, size, page: pageParam });
        return {
          data: res.data.data,
          nextPage: res.data.data.resultsSize === size ? pageParam + 1 : undefined,
        };
      },
      getNextPageParam: (lastPage) => lastPage.nextPage,
      initialPageParam: 0,
    }),

  comments: ({ squadId, page, size }: { squadId: number; page?: number; size?: number }) =>
    makeQueryOptions([...squadQueries.root(), 'comments', squadId, page, size], () =>
      squadCommentListGetFetch({ squadId, page, size }),
    ),
};

export const categoryQueries = {
  list: () => makeQueryOptions(['category'], () => categoriesGetFetch()),
};
