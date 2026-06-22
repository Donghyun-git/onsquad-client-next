import {
  type MyHistoriesGetFetchParams,
  myCrewParticipantsGetFetch,
  myCrewRequestsGetFetch,
  myHistoriesGetFetch,
  mySquadParticipantsGetFetch,
  mySquadRequestsGetFetch,
} from '@/shared/api/member';
import { makeQueryOptions } from '@/shared/lib/queries/makeQueryOptions';

export const memberQueries = {
  root: () => ['member'],

  myCrewParticipants: () =>
    makeQueryOptions([...memberQueries.root(), 'myCrewParticipants'], () => myCrewParticipantsGetFetch()),

  mySquadParticipants: () =>
    makeQueryOptions([...memberQueries.root(), 'mySquadParticipants'], () => mySquadParticipantsGetFetch()),

  mySquadRequests: ({ page, size }: { page?: number; size?: number } = {}) =>
    makeQueryOptions([...memberQueries.root(), 'mySquadRequests', page, size], () =>
      mySquadRequestsGetFetch({ page, size }),
    ),

  myCrewRequests: ({ page, size }: { page?: number; size?: number } = {}) =>
    makeQueryOptions([...memberQueries.root(), 'myCrewRequests', page, size], () =>
      myCrewRequestsGetFetch({ page, size }),
    ),

  histories: (params: MyHistoriesGetFetchParams) =>
    makeQueryOptions([...memberQueries.root(), 'histories', params], () => myHistoriesGetFetch(params)),
};
