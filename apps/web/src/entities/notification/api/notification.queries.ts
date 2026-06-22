import { infiniteQueryOptions } from '@tanstack/react-query';

import { notificationListGetFetch } from '@/shared/api/notification';

const PAGE_SIZE = 10;

export const notificationQueries = {
  root: () => ['notification'],

  infiniteList: () =>
    infiniteQueryOptions({
      queryKey: [...notificationQueries.root(), 'infinite', { size: PAGE_SIZE }],
      queryFn: async ({ pageParam }) => {
        const res = await notificationListGetFetch({ page: pageParam, size: PAGE_SIZE });

        return {
          data: res.data.data,
          nextPage: res.data.data.resultsSize === PAGE_SIZE ? pageParam + 1 : undefined,
        };
      },
      getNextPageParam: (lastPage) => lastPage.nextPage,
      initialPageParam: 0,
    }),
};
