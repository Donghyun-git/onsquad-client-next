'use client';

import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { ChevronRight } from 'lucide-react';

import { crewQueries } from '@/entities/crew';

import { Avatar } from '@/shared/ui/Avatar';
import { Button } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';

interface ParticipantListProps {
  crewId: number;
}

const ParticipantList = ({ crewId }: ParticipantListProps) => {
  const { data } = useQuery(crewQueries.participants({ crewId }));

  const participants = data?.data.results ?? [];

  if (participants.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Text.sm className="text-grayscale500">참가 신청자가 없습니다</Text.sm>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {participants.map(({ id, requestAt, requester }) => (
        <li key={id} className="flex flex-col gap-2 rounded-xl bg-white p-3">
          <div className="flex items-center gap-2">
            <Avatar className="size-6 shrink-0" />
            <Text.sm className="font-medium tracking-tight text-grayscale900">{requester.nickname}</Text.sm>
          </div>

          <div className="flex items-center justify-between">
            <Text.sm className="flex-1 tracking-tight text-grayscale900">{requester.introduce}</Text.sm>
            <ChevronRight className="size-6 shrink-0 text-grayscale900" />
          </div>

          <div className="flex items-center justify-between">
            <Text.xs className="text-grayscale500">{dayjs(requestAt).format('YYYY년 MM월 DD일')}</Text.xs>

            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                className="h-auto rounded-full bg-primary50 px-3 py-1 text-sm font-medium tracking-tight text-primary700 hover:bg-primary50 hover:text-primary700"
              >
                거절
              </Button>
              <Button
                variant="ghost"
                className="h-auto rounded-full bg-primary50 px-3 py-1 text-sm font-medium tracking-tight text-primary700 hover:bg-primary50 hover:text-primary700"
              >
                수락
              </Button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ParticipantList;
