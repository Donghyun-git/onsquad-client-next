'use client';

import { useRouter } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { isEmpty } from 'es-toolkit/compat';
import { PencilLine, Star } from 'lucide-react';

import { crewQueries } from '@/entities/crew/api/crew.queries';

import { DEFAULT_PROFILE_IMAGE } from '@/shared/config';
import { getRoleText } from '@/shared/lib';
import { cn } from '@/shared/lib/utils';
import { Article } from '@/shared/ui/Article';
import { Avatar } from '@/shared/ui/Avatar';
import { Badge } from '@/shared/ui/Badge';
import { PostButton } from '@/shared/ui/PostButton';
import { Text } from '@/shared/ui/Text';
import { ScrollArea } from '@/shared/ui/ui/scroll-area';

interface AnnounceListProps {
  crewId: number;
}

export const AnnounceList = ({ crewId }: AnnounceListProps) => {
  const router = useRouter();

  const { data } = useQuery(crewQueries.announceList({ crewId }));

  const canWrite = data?.data.states.canWrite ?? false;
  const announces = data?.data.announces ?? [];

  const isEmptyAnnounces = isEmpty(announces);

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col">
      <Article
        className="flex min-h-0 w-full flex-1 flex-col overflow-hidden p-3"
        slot={
          <>
            <div className="flex shrink-0 items-center justify-between">
              <Text.lg className="font-bold">
                <h5>공지사항</h5>
              </Text.lg>

              {canWrite && (
                <PostButton
                  className="border border-primary px-2 py-0.5"
                  onPageMove={() => router.push(`/crews/${crewId}/announce/write`, { scroll: false })}
                >
                  <PencilLine size={12} strokeWidth={2} />
                  <Text.xxs className="ml-1 font-bold">글쓰기</Text.xxs>
                </PostButton>
              )}
            </div>
            <ScrollArea className="mt-6 min-h-0 flex-1 overflow-auto pb-6">
              <ul className="flex flex-col">
                {isEmptyAnnounces ? (
                  <li className="flex flex-1 items-center justify-center">
                    <Text.xl> 등록된 공지사항이 없어요.</Text.xl>
                  </li>
                ) : (
                  announces.map((announce, index) => (
                    <li
                      key={index}
                      className="cursor-pointer"
                      onClick={() => router.push(`/crews/${crewId}/announce/${announce.id}`, { scroll: false })}
                    >
                      <div
                        className={cn(
                          'border-grayScale400 mt-2 flex flex-col justify-center gap-2 border-t',
                          index === 0 && 'border-none',
                        )}
                      >
                        <div className="mt-2 flex justify-between">
                          <Text.base className="font-semibold">{announce.title}</Text.base>
                          {announce.pinned && <Star size={16} fill="#ffcd29" stroke="#ffcd29" />}
                        </div>
                        <div className="footer flex items-center justify-between">
                          <div className="flex items-center gap-[3px]">
                            <div className="flex items-center gap-0.5">
                              <Avatar className="h-4 w-4 border border-grayscale200" imageUrl={DEFAULT_PROFILE_IMAGE} />
                              <Text.xs className="pt-[0.05rem]">
                                {announce.writer.nickname} {announce.writer.role}
                              </Text.xs>
                            </div>
                            <Badge className="px-0.5 py-0">
                              <Text.xxs>{getRoleText(announce.states.role)}</Text.xxs>
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
                )}
              </ul>
            </ScrollArea>
          </>
        }
      />
    </div>
  );
};
