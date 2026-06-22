'use client';

import { useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';
import { Loader2, MoreVertical } from 'lucide-react';

import { memberQueries } from '@/entities/member';
import type { MyActivityHistoryItem } from '@/entities/member';

import { Text } from '@/shared/ui/Text';

// recordedAt(ISO) → 날짜 그룹 라벨 (YYYY.MM.DD)
const formatDate = (iso: string): string => {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};

const toQueryDate = (date: Date) => date.toISOString().slice(0, 10);

const HistoryTab = () => {
  // histories 는 from·to 가 필수다. 별도 기간 필터 UI 가 없으므로 기본 최근 1년을 조회한다.
  const range = useMemo(() => {
    const to = new Date();
    const from = new Date(to);
    from.setFullYear(to.getFullYear() - 1);
    return { from: toQueryDate(from), to: toQueryDate(to) };
  }, []);

  const { data, isLoading } = useQuery({ ...memberQueries.histories(range), throwOnError: false });

  const list = data?.data.results ?? [];

  // recordedAt 날짜 기준으로 그룹핑
  const grouped = list.reduce<Record<string, MyActivityHistoryItem[]>>((acc, item) => {
    const date = formatDate(item.recordedAt);
    (acc[date] ??= []).push(item);
    return acc;
  }, {});
  const dates = Object.keys(grouped);

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
        <Text.sm className="text-grayscale500">활동 내역이 없어요.</Text.sm>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-s-20 px-s-40 py-s-60">
      {dates.map((date) => (
        <div key={date} className="flex flex-col gap-s-20">
          <div className="pb-s-20">
            <Text.xl className="font-bold tracking-tight">{date}</Text.xl>
          </div>
          <div className="flex flex-col gap-s-10">
            {grouped[date].map((item, idx) => (
              <div
                key={`${item.recordedAt}-${idx}`}
                className="flex items-center justify-between rounded-xl bg-white p-s-30"
              >
                <Text.sm className="flex-1 leading-130 tracking-tight text-grayscale900">{item.message}</Text.sm>
                <button type="button" aria-label="더보기" className="ml-s-10 shrink-0 text-grayscale500">
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
