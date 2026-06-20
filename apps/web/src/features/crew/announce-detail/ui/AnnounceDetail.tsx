'use client';

import { useRouter } from 'next/navigation';

import { useRef } from 'react';

import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { CircleCheck, Loader2, SquarePen, Star } from 'lucide-react';
import dynamic from 'next/dynamic';
import remarkGfm from 'remark-gfm';

import { crewQueries } from '@/entities/crew/api/crew.queries';

import { DEFAULT_PROFILE_IMAGE } from '@/shared/config';
import { TOAST } from '@/shared/config/toast';
import { cn, getRoleText } from '@/shared/lib';
import { useCalculateHeight } from '@/shared/lib/hooks';
import { useToast } from '@/shared/lib/hooks/useToast';
import { Article } from '@/shared/ui/Article';
import { Avatar } from '@/shared/ui/Avatar';
import { Badge } from '@/shared/ui/Badge';
import { IconButton } from '@/shared/ui/IconButton';
import { PostButton } from '@/shared/ui/PostButton';
import { Text } from '@/shared/ui/Text';
import { ScrollArea } from '@/shared/ui/ui/scroll-area';

import { useAnnouncePinMutation } from '../model/useAnnouncePinMutation';

const ReactMarkdown = dynamic(() => import('react-markdown'), {
  ssr: false,
  loading: () => <Loader2 className="animate-spin" size={12} />,
});

const AnnounceDetail = ({ crewId, announceId }: { crewId: number; announceId: number }) => {
  const router = useRouter();

  const { data } = useQuery(crewQueries.announceDetail({ crewId, announceId }));

  const { mutateAsync: announcePinMutate, isPending: isAnnouncePinPending } = useAnnouncePinMutation({
    crewId,
    announceId,
  });

  const { toast, hide } = useToast();

  const containerRef = useRef<HTMLDivElement>(null);

  const canModify = data?.states.canModify ?? false;
  const canPin = data?.states.canPin ?? false;
  const isPinned = data?.pinned ?? false;

  const role = getRoleText(data?.states.role);

  const contentHeight = useCalculateHeight({
    layoutElement: containerRef,
  });

  const handleAnnouncePin = async () => {
    await announcePinMutate({ crewId, announceId, state: !isPinned });

    toast({
      title: isPinned ? '상단에서 제거했어요' : '상단에 고정했어요',
      className: TOAST.success,
      icon: <CircleCheck onClick={() => hide()} />,
    });
  };

  return (
    <Article
      ref={containerRef}
      className="h-full w-full p-3"
      slot={
        <div className="mx-2 h-full">
          <Text.lg className="font-bold">
            <h5>{data?.title}</h5>
          </Text.lg>

          <div className="mt-3">
            <div className="mt-2">
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  <Avatar className="h-4 w-4 border border-grayscale200" imageUrl={DEFAULT_PROFILE_IMAGE} />
                  <Text.xs className="font-semibold">{data?.writer.nickname}</Text.xs>
                  <Badge>{role}</Badge>
                </div>
                <Text.xs className="text-grayscale500">{dayjs(data?.createdAt).format('YYYY년 MM월 DD일')}</Text.xs>
              </div>

              <div className="flex items-center justify-between border-t border-grayscale200 py-2">
                {isAnnouncePinPending ? (
                  <Loader2 className="animate-spin" size={12} />
                ) : canPin ? (
                  <IconButton
                    className={cn('text-grayscale400', isPinned && 'text-star')}
                    icon={<Star fill={isPinned ? '#ffcd29' : '#b9b9b9'} size={12} />}
                    onClick={handleAnnouncePin}
                  >
                    <Text.xs className="pt-0.5 font-semibold">상단고정</Text.xs>
                  </IconButton>
                ) : null}

                {canModify && (
                  <PostButton
                    className="border border-grayscale400 px-2 py-0.5 text-grayscale400"
                    onPageMove={() => router.push(`/crews/${crewId}/announce/${announceId}/edit`, { scroll: false })}
                  >
                    <SquarePen size={12} strokeWidth={2} />
                    <Text.xs className="ml-1 font-bold">수정하기</Text.xs>
                  </PostButton>
                )}
              </div>
            </div>

            <ScrollArea
              style={{ height: `${contentHeight - 150}px` }}
              className="h-full max-w-none overflow-y-auto bg-white py-2 pr-4"
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{data?.content || '작성된 내용이 없습니다.'}</ReactMarkdown>
            </ScrollArea>
          </div>
        </div>
      }
    />
  );
};

export default AnnounceDetail;
