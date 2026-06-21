'use client';

import { cn } from '@/shared/lib/utils';
import { Text } from '@/shared/ui/Text';

import { MOCK_ACTIVITY_NOTIFICATIONS } from './mock';

const NotificationTab = () => {
  return (
    <div className="flex flex-col gap-s-10 px-s-40 py-s-60">
      {MOCK_ACTIVITY_NOTIFICATIONS.map((item) => (
        <div
          key={item.id}
          className={cn(
            'flex flex-col gap-s-10 rounded-xl p-s-30',
            item.isRead ? 'bg-white' : 'bg-primary50',
          )}
        >
          <Text.sm className="leading-130 tracking-tight text-grayscale900">
            {item.message}
          </Text.sm>
          <Text.xs className="text-grayscale500">{item.date}</Text.xs>
        </div>
      ))}
    </div>
  );
};

export default NotificationTab;
