'use client';

import { useEffect } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

import { formatNotificationDate, notificationQueries, useReadNotificationMutation } from '@/entities/notification';
import type { NotificationListItem } from '@/entities/notification';
import NotificationCard from './NotificationCard';

// occurredAt 날짜(YYYY.MM.DD) 기준으로 묶어 디자인의 날짜 그룹 헤더를 만든다.
const groupByDate = (list: NotificationListItem[]) => {
  const groups = new Map<string, NotificationListItem[]>();

  list.forEach((item) => {
    const date = formatNotificationDate(item.occurredAt);
    const bucket = groups.get(date);

    if (bucket) {
      bucket.push(item);
    } else {
      groups.set(date, [item]);
    }
  });

  return Array.from(groups.entries());
};

const NotificationList = () => {
  const { ref, inView } = useInView();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    ...notificationQueries.infiniteList(),
  });

  const readNotification = useReadNotificationMutation();

  const list = data?.pages.flatMap((page) => page.data.results) ?? [];
  const grouped = groupByDate(list);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      void fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="h-6 w-6 animate-spin text-primary500" />
      </div>
    );
  }

  if (list.length === 0) {
    return (
      <div className="flex justify-center py-16">
        <p className="text-200 leading-130 text-grayscale500">받은 알림이 없어요.</p>
      </div>
    );
  }

  return (
    <div className="gap-s-20 flex flex-col">
      {grouped.map(([date, items]) => (
        <div key={date} className="gap-s-20 flex flex-col">
          <div className="pb-s-20 flex items-center">
            <h2 className="text-500 leading-130 font-bold tracking-[-0.4px] text-grayscale900">{date}</h2>
          </div>
          {items.map((item) => (
            <NotificationCard
              key={item.id}
              item={item}
              onRead={() => readNotification.mutate(item.id)}
              isReading={readNotification.isPending}
            />
          ))}
        </div>
      ))}

      {hasNextPage && (
        <div ref={ref} className="flex justify-center py-4">
          <Loader2 className="h-6 w-6 animate-spin text-primary500" />
        </div>
      )}
    </div>
  );
};

export default NotificationList;
