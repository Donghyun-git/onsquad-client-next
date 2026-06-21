'use client';

import { MoreVertical } from 'lucide-react';

import { Text } from '@/shared/ui/Text';

import { MOCK_ACTIVITY_HISTORY } from './mock';

const HistoryTab = () => {
  // date 기준으로 그룹핑
  const grouped = MOCK_ACTIVITY_HISTORY.reduce<Record<string, typeof MOCK_ACTIVITY_HISTORY>>((acc, item) => {
    if (!acc[item.date]) acc[item.date] = [];
    acc[item.date].push(item);
    return acc;
  }, {});

  const dates = Object.keys(grouped);

  return (
    <div className="flex flex-col gap-s-20 px-s-40 py-s-60">
      {dates.map((date) => (
        <div key={date} className="flex flex-col gap-s-20">
          <div className="pb-s-20">
            <Text.xl className="font-bold tracking-tight">{date}</Text.xl>
          </div>
          <div className="flex flex-col gap-s-10">
            {grouped[date].map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-xl bg-white p-s-30"
              >
                <Text.sm className="flex-1 leading-130 tracking-tight text-grayscale900">
                  {item.message}
                </Text.sm>
                <button
                  type="button"
                  aria-label="더보기"
                  className="ml-s-10 shrink-0 text-grayscale500"
                >
                  <MoreVertical size={18} strokeWidth={1.5} />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HistoryTab;
