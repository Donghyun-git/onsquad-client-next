import {
  categoriesGetFetch,
  crewSquadListGetFetch,
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

  comments: ({ squadId, page, size }: { squadId: number; page?: number; size?: number }) =>
    makeQueryOptions([...squadQueries.root(), 'comments', squadId, page, size], () =>
      squadCommentListGetFetch({ squadId, page, size }),
    ),
};

export const categoryQueries = {
  list: () => makeQueryOptions(['category'], () => categoriesGetFetch()),
};
