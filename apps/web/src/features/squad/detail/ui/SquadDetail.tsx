'use client';

import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { CircleX, MoreVertical } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { overlay } from 'overlay-kit';

import { squadQueries } from '@/entities/squad/api/squad.queries';
import { squadLeaveFetch, squadRequestCancelFetch, squadRequestPostFetch } from '@/entities/squad/api';
import { SQUAD_PATH } from '@/shared/config/paths';
import { TOAST } from '@/shared/config/toast';
import { useToast } from '@/shared/lib/hooks/useToast';
import { closeWithAnimation } from '@/shared/lib/overlay';
import { OVERLAY_ANIMATION_DURATION } from '@/shared/config';
import { useApiMutation } from '@/shared/lib/queries';
import { Alert } from '@/shared/ui/Alert';
import { BUTTON } from '@/shared/ui/Alert/style';
import { Avatar } from '@/shared/ui/Avatar';
import { BottomSheet } from '@/shared/ui/BottomSheet';
import { Button } from '@/shared/ui/Button';
import { Button as LibButton } from '@/shared/ui/ui/button';

import { CommentSection } from './CommentSection';

const BADGE_BASE_CLASS = 'text-100 leading-130 rounded-lg px-2 py-1 font-bold text-white';

interface SquadDetailProps {
  id: string;
}

export const SquadDetail = ({ id }: SquadDetailProps) => {
  const router = useRouter();
  const { toast, hide } = useToast();
  const { data } = useQuery(squadQueries.detail({ squadId: Number(id) }));
  const squad = data?.data;
  const [expanded, setExpanded] = useState(false);

  const requestMutation = useApiMutation({
    fetcher: squadRequestPostFetch,
    invalidateKey: squadQueries.root(),
  });

  const cancelMutation = useApiMutation({
    fetcher: squadRequestCancelFetch,
    invalidateKey: squadQueries.root(),
  });

  const leaveMutation = useApiMutation({
    fetcher: squadLeaveFetch,
    invalidateKey: squadQueries.root(),
  });

  if (!squad) return null;

  const { states } = squad;
  const recruited = squad.capacity - squad.remain;

  const handleRequest = () => requestMutation.mutate({ squadId: squad.id });
  const handleCancelRequest = () => cancelMutation.mutate({ squadId: squad.id });

  const confirmLeave = () => {
    overlay.open(({ isOpen, close, unmount }) => {
      const handleClose = () => closeWithAnimation(close, unmount);
      return (
        <Alert
          isOpen={isOpen}
          title="정말 나가시겠습니까?"
          buttonSlot={
            <div className="grid grid-cols-2">
              <LibButton className={BUTTON.CANCEL} onClick={handleClose}>
                취소
              </LibButton>
              <LibButton
                className={BUTTON.ACTION}
                onClick={async () => {
                  handleClose();
                  await leaveMutation.mutateAsync({ squadId: squad.id });
                  toast({
                    title: '스쿼드를 나왔습니다.',
                    className: TOAST.primary,
                    icon: <CircleX onClick={() => hide()} />,
                  });
                }}
              >
                나가기
              </LibButton>
            </div>
          }
        >
          스쿼드에서 나갑니다.
        </Alert>
      );
    });
  };

  const handleOpenMenu = () => {
    overlay.open(({ isOpen, close, unmount }) => {
      const handleClose = () => closeWithAnimation(close, unmount);
      return (
        <BottomSheet title={squad.title} isOpen={isOpen} onClose={handleClose}>
          <div className="flex flex-col gap-2">
            <LibButton
              variant="ghost"
              className="justify-start"
              onClick={() => {
                handleClose();
                setTimeout(() => confirmLeave(), OVERLAY_ANIMATION_DURATION);
              }}
            >
              나가기
            </LibButton>
          </div>
        </BottomSheet>
      );
    });
  };

  return (
    <div className="flex min-h-[calc(90svh-var(--app-header-height))] flex-col gap-3 bg-grayscale100 pb-6">
      {/* 스쿼드 상세 카드 */}
      <div className="mx-0 flex flex-col gap-2 rounded-lg bg-white px-4 py-3">
        {/* 제목 */}
        <div className="flex items-center pb-2">
          <h2 className="text-500 leading-130 flex-1 font-bold text-grayscale900">{squad.title}</h2>
          {states.alreadyParticipant && states.canLeave && (
            <button type="button" aria-label="스쿼드 메뉴" onClick={handleOpenMenu}>
              <MoreVertical size={20} className="text-grayscale500" />
            </button>
          )}
        </div>

        {/* 지역 + 카테고리 */}
        <div className="flex items-center gap-3 py-1">
          <span className="text-100 leading-130 font-medium text-grayscale900">지역</span>
          <div className="flex items-center gap-1">
            {squad.address && (
              <span className={`${BADGE_BASE_CLASS} bg-primary700`}>
                {squad.address}
              </span>
            )}
            {squad.addressDetail && (
              <span className={`${BADGE_BASE_CLASS} bg-primary700`}>
                {squad.addressDetail}
              </span>
            )}
          </div>
        </div>

        {/* 작성자 + 내용 */}
        <div className="flex flex-col gap-2 pb-9 pt-2">
          <div className="flex items-center gap-1">
            <Avatar className="size-4" />
            <span className="text-200 leading-130 font-medium tracking-[-0.28px] text-grayscale900">
              {squad.leader.nickname}
            </span>
          </div>
          <div
            className={`text-300 leading-130 whitespace-pre-wrap font-medium text-grayscale900 [word-break:break-word] ${
              !expanded ? 'line-clamp-6' : ''
            }`}
          >
            {squad.content}
          </div>
          {!expanded && (
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="text-300 font-regular leading-130 text-center tracking-[-0.32px] text-grayscale900"
            >
              더보기
            </button>
          )}
        </div>

        {/* 카테고리 + 모집정원 */}
        <div className="flex items-center gap-6">
          <div className="flex flex-1 flex-wrap gap-1">
            {squad.categories.map((cat) => (
              <span key={cat} className={`${BADGE_BASE_CLASS} bg-primary900`}>
                {cat}
              </span>
            ))}
          </div>
          {states.canSeeParticipants ? (
            <button
              type="button"
              onClick={() => router.push(SQUAD_PATH.members(squad.id))}
              className="text-300 font-regular leading-130 whitespace-nowrap tracking-[-0.32px] text-grayscale900"
              aria-label="참여자 목록 보기"
            >
              모집정원 {recruited}/{squad.capacity} 명
            </button>
          ) : (
            <span className="text-300 font-regular leading-130 whitespace-nowrap tracking-[-0.32px] text-grayscale900">
              모집정원 {recruited}/{squad.capacity} 명
            </span>
          )}
        </div>

        {/* 상태별 액션 버튼 */}
        {states.alreadyParticipant ? (
          // 합류 수락(스쿼드원) → 오픈카톡 참여
          <Link
            href={squad.kakaoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 flex items-center justify-center rounded-lg bg-primary500 p-3"
            aria-label="오픈카톡 참여"
          >
            <span className="text-300 leading-130 font-medium tracking-[-0.32px] text-white">오픈카톡 참여</span>
          </Link>
        ) : states.alreadyRequest ? (
          // 신청 중 → 합류신청 완료(비활성) + 취소
          <div className="mt-1 flex flex-col gap-1">
            <button
              type="button"
              disabled
              className="flex items-center justify-center rounded-lg bg-grayscale100 p-3"
              aria-label="합류신청 완료"
            >
              <span className="text-300 leading-130 font-medium tracking-[-0.32px] text-grayscale500">
                합류신청 완료
              </span>
            </button>
            <button
              type="button"
              onClick={handleCancelRequest}
              disabled={cancelMutation.isPending}
              className="flex items-center justify-center rounded-lg bg-white p-3 disabled:opacity-50"
              aria-label="합류 신청 취소"
            >
              <span className="text-300 leading-130 font-medium tracking-[-0.32px] text-grayscale500">취소</span>
            </button>
          </div>
        ) : (
          // 기본 / 거절 → 합류 신청하기
          <Button className="mt-1 w-full" onClick={handleRequest} isLoading={requestMutation.isPending}>
            합류 신청하기
          </Button>
        )}
      </div>

      {/* 댓글 섹션 */}
      <CommentSection squadId={Number(id)} />
    </div>
  );
};
