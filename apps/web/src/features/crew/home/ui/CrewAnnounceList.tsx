'use client';

import { useRouter } from 'next/navigation';

import dayjs from 'dayjs';
import { Star } from 'lucide-react';

import type { CrewHomeInfoResponseProps } from '@/shared/api/crew/home/crewHomeInfoGetFetch';
import { getRoleText } from '@/shared/lib';
import { cn } from '@/shared/lib/utils';
import type { CrewRole } from '@/shared/types';
import { Article } from '@/shared/ui/Article';
import { Avatar } from '@/shared/ui/Avatar';
import { Badge } from '@/shared/ui/Badge';
import { Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/ui/button';

interface CrewAnnounceListProps {
  announces?: PropType<PropType<CrewHomeInfoResponseProps, 'data'>, 'announces'>;
  crewId?: number;
}

export const CrewAnnounceList = ({ announces, crewId }: CrewAnnounceListProps) => {
  const router = useRouter();

  const handleAnnouncePageMove = () => {
    if (crewId) {
      router.push(`/crews/${crewId}/announce`, {
        scroll: false,
      });
    }
  };

  return (
    <Article
      className="h-[360px] w-full p-3"
      slot={
        <>
          <div className="flex items-center justify-between">
            <Text.lg className="font-bold">
              <h5>공지사항</h5>
            </Text.lg>

            <Button
              className="text-grayscale500 hover:bg-[0] hover:text-grayscale600 active:scale-110 active:bg-[0] active:text-grayscale600"
              variant="ghost"
              onClick={handleAnnouncePageMove}
            >
              <Text.xs>더보기</Text.xs>
            </Button>
          </div>
          <ul className="mt-8 flex flex-col">
            {announces && announces.length > 0 ? (
              announces.map((announce, index) => (
                <li key={index} className="cursor-pointer" onClick={handleAnnouncePageMove}>
                  <div
                    className={cn(
                      'border-grayScale400 mt-2 flex flex-col justify-center gap-2 border-t',
                      index === 0 && 'border-none',
                    )}
                  >
                    <div className="mt-2 flex justify-between">
                      <Text.base className="font-semibold">{announce.title}</Text.base>
                      {announce.pinned && <Star size={16} fill="#FFCD29" stroke="#FFCD29" />}
                    </div>
                    <div className="footer flex items-center justify-between">
                      <div className="flex items-center gap-[3px]">
                        <div className="flex items-center gap-0.5">
                          <Avatar className="h-4 w-4" />
                          <Text.xs className="pt-[0.05rem]">{announce.writer?.nickname}</Text.xs>
                        </div>
                        <Badge className="px-0.5 py-0">
                          <Text.xxs>{getRoleText((announce.states?.role ?? 'OWNER') as CrewRole)}</Text.xxs>
                        </Badge>
                      </div>
                      <div>
                        <Text.xs className="text-grayscale500">
                          {dayjs(announce.createdAt).format('YYYY년 MM월 DD일')}
                        </Text.xs>
                      </div>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li>
                <Text.xl> 등록된 공지사항이 없어요.</Text.xl>
              </li>
            )}
          </ul>
        </>
      }
    />
  );
};
