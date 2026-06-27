'use client';

import { useEffect } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

import { formatNotificationDate, notificationQueries } from '@/entities/notification';

import { Text } from '@/shared/ui/Text';

import { useReadNotificationMutation } from '../model/useReadNotificationMutation';

const NotificationTab = () => {
  const { ref, inView } = useInView();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    ...notificationQueries.infiniteList(),
  });

  const readNotification = useReadNotificationMutation();

  const list = data?.pages.flatMap((page) => page.data.results) ?? [];

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      void fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <div className="py-s-60 flex justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary500" />
      </div>
    );
  }

  if (list.length === 0) {
    return (
      <div className="py-s-60 flex justify-center">
        <Text.sm className="text-grayscale500">받은 알림이 없어요.</Text.sm>
      </div>
    );
  }

  return (
    <div className="gap-s-10 px-s-40 py-s-60 flex flex-col">
      {list.map((item) =>
        item.read ? (
          <div key={item.id} className="gap-s-10 p-s-30 flex flex-col rounded-xl bg-white">
            <Text.sm className="leading-130 tracking-tight text-grayscale900">{item.payload?.message ?? ''}</Text.sm>
            <Text.xs className="text-grayscale500">{formatNotificationDate(item.occurredAt)}</Text.xs>
          </div>
        ) : (
          <button
            key={item.id}
            type="button"
            onClick={() => readNotification.mutate(item.id)}
            disabled={readNotification.isPending}
            className="gap-s-10 p-s-30 flex flex-col rounded-xl bg-primary50 text-left disabled:opacity-60"
          >
            <Text.sm className="leading-130 tracking-tight text-grayscale900">{item.payload?.message ?? ''}</Text.sm>
            <Text.xs className="text-grayscale500">{formatNotificationDate(item.occurredAt)}</Text.xs>
          </button>
        ),
      )}

      {hasNextPage && (
        <div ref={ref} className="py-s-20 flex justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-primary500" />
        </div>
      )}
    </div>
  );
};

export default NotificationTab;
