'use client';

import { useEffect } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

import { formatNotificationDate, notificationQueries } from '@/entities/notification';

import { cn } from '@/shared/lib/utils';
import { Text } from '@/shared/ui/Text';

const NotificationTab = () => {
  const { ref, inView } = useInView();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    ...notificationQueries.infiniteList(),
    throwOnError: false,
  });

  const list = data?.pages.flatMap((page) => page.data.results) ?? [];

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      void fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-s-60">
        <Loader2 className="h-6 w-6 animate-spin text-primary500" />
      </div>
    );
  }

  if (list.length === 0) {
    return (
      <div className="flex justify-center py-s-60">
        <Text.sm className="text-grayscale500">받은 알림이 없어요.</Text.sm>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-s-10 px-s-40 py-s-60">
      {list.map((item) => (
        <div
          key={item.id}
          className={cn('flex flex-col gap-s-10 rounded-xl p-s-30', item.read ? 'bg-white' : 'bg-primary50')}
        >
          <Text.sm className="leading-130 tracking-tight text-grayscale900">{item.payload?.message ?? ''}</Text.sm>
          <Text.xs className="text-grayscale500">{formatNotificationDate(item.occurredAt)}</Text.xs>
        </div>
      ))}

      {hasNextPage && (
        <div ref={ref} className="flex justify-center py-s-20">
          <Loader2 className="h-6 w-6 animate-spin text-primary500" />
        </div>
      )}
    </div>
  );
};

export default NotificationTab;
