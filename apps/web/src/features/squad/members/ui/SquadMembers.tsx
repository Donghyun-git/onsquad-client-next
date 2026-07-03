'use client';

import { useQuery } from '@tanstack/react-query';
import { MoreVertical, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { overlay } from 'overlay-kit';

import { squadQueries } from '@/entities/squad';
import type { SquadParticipantItem } from '@/entities/squad';
import { squadDeleteFetch, squadDelegateLeaderFetch, squadKickFetch } from '@/entities/squad/api';
import { closeWithAnimation } from '@/shared/lib/overlay';
import { OVERLAY_ANIMATION_DURATION } from '@/shared/config';
import { useApiMutation } from '@/shared/lib/queries';
import { Alert } from '@/shared/ui/Alert';
import { BUTTON } from '@/shared/ui/Alert/style';
import { Avatar } from '@/shared/ui/Avatar';
import { BottomSheet } from '@/shared/ui/BottomSheet';
import { Button } from '@/shared/ui/ui/button';

import SquadMemberCard from './SquadMemberCard';

interface SquadMembersProps {
  squadId: number;
}

const SquadMembers = ({ squadId }: SquadMembersProps) => {
  const router = useRouter();

  const { data } = useQuery(squadQueries.detail({ squadId }));
  const { data: membersData } = useQuery(squadQueries.members({ squadId }));

  const squad = data?.data;
  const members = membersData?.data.results ?? [];

  const deleteMutation = useApiMutation({
    fetcher: squadDeleteFetch,
    invalidateKey: squadQueries.root(),
  });

  const kickMutation = useApiMutation({
    fetcher: squadKickFetch,
    invalidateKey: squadQueries.root(),
  });

  const delegateMutation = useApiMutation({
    fetcher: squadDelegateLeaderFetch,
    invalidateKey: squadQueries.root(),
  });

  if (!squad) return null;

  const isLeader = !!squad.states.isLeader;

  const handleDeleteSquad = () => {
    overlay.open(({ isOpen, close, unmount }) => {
      const handleClose = () => closeWithAnimation(close, unmount);
      return (
        <Alert
          isOpen={isOpen}
          title="스쿼드를 삭제할까요?"
          buttonSlot={
            <div className="grid grid-cols-2">
              <Button className={BUTTON.CANCEL} onClick={handleClose}>
                취소
              </Button>
              <Button
                className={BUTTON.ACTION}
                onClick={async () => {
                  handleClose();
                  await deleteMutation.mutateAsync({ squadId });
                  router.back();
                }}
              >
                삭제
              </Button>
            </div>
          }
        >
          스쿼드를 삭제합니다.
        </Alert>
      );
    });
  };

  const confirmKick = (item: SquadParticipantItem) => {
    const { nickname } = item.member;
    overlay.open(({ isOpen, close, unmount }) => {
      const handleClose = () => closeWithAnimation(close, unmount);
      return (
        <Alert
          isOpen={isOpen}
          title="멤버를 추방할까요?"
          buttonSlot={
            <div className="grid grid-cols-2">
              <Button className={BUTTON.CANCEL} onClick={handleClose}>
                취소
              </Button>
              <Button
                className={BUTTON.ACTION}
                onClick={async () => {
                  handleClose();
                  await kickMutation.mutateAsync({ squadId, targetMemberId: item.member.id });
                }}
              >
                추방
              </Button>
            </div>
          }
        >
          {nickname} 님을 스쿼드에서 추방합니다.
        </Alert>
      );
    });
  };

  const confirmDelegate = (item: SquadParticipantItem) => {
    const { nickname } = item.member;
    overlay.open(({ isOpen, close, unmount }) => {
      const handleClose = () => closeWithAnimation(close, unmount);
      return (
        <Alert
          isOpen={isOpen}
          title={`${nickname} 님에게 리더를 위임할까요?`}
          buttonSlot={
            <div className="grid grid-cols-2">
              <Button className={BUTTON.CANCEL} onClick={handleClose}>
                취소
              </Button>
              <Button
                className={BUTTON.ACTION}
                onClick={async () => {
                  handleClose();
                  await delegateMutation.mutateAsync({ squadId, targetMemberId: item.member.id });
                }}
              >
                위임
              </Button>
            </div>
          }
        >
          {nickname} 님에게 리더 권한을 위임합니다.
        </Alert>
      );
    });
  };

  const handleManageMember = (item: SquadParticipantItem) => {
    overlay.open(({ isOpen, close, unmount }) => {
      const handleClose = () => closeWithAnimation(close, unmount);
      return (
        <BottomSheet title={`${item.member.nickname} 님`} isOpen={isOpen} onClose={handleClose}>
          <div className="flex flex-col gap-2">
            {item.states.canDelegateLeader && (
              <Button
                variant="ghost"
                className="justify-start"
                onClick={() => {
                  handleClose();
                  setTimeout(() => confirmDelegate(item), OVERLAY_ANIMATION_DURATION);
                }}
              >
                리더 위임
              </Button>
            )}
            {item.states.canKick && (
              <Button
                variant="ghost"
                className="justify-start"
                onClick={() => {
                  handleClose();
                  setTimeout(() => confirmKick(item), OVERLAY_ANIMATION_DURATION);
                }}
              >
                추방
              </Button>
            )}
          </div>
        </BottomSheet>
      );
    });
  };

  return (
    <div className="flex flex-col gap-4 bg-grayscale50 px-4 py-6 min-h-screen">
      {/* 스쿼드 정보 카드 (상단 요약) */}
      <div className="overflow-hidden rounded-lg border-t-2 border-primary700 bg-white">
        <div className="flex flex-col gap-1 p-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Zap size={18} className="fill-primary500 text-primary500" />
              <Avatar className="size-4" />
              <span className="text-200 font-regular leading-130 text-grayscale800 tracking-[-0.28px]">
                {squad.leader.nickname}
              </span>
              <span className="text-200 font-regular leading-130 text-grayscale800 tracking-[-0.28px]">
                님의 스쿼드
              </span>
            </div>
            {isLeader && squad.states.canDelete && (
              <button type="button" aria-label="스쿼드 관리" onClick={handleDeleteSquad}>
                <MoreVertical size={20} className="text-grayscale500" />
              </button>
            )}
          </div>
          <p className="text-200 font-medium leading-130 text-grayscale900 tracking-[-0.28px]">
            {squad.title}
          </p>
          <div className="flex items-center gap-1">
            {squad.categories.map((c) => (
              <span
                key={c}
                className="rounded px-1 py-0 text-75 font-medium leading-150 text-white bg-primary700 tracking-[-0.2px]"
              >
                {c}
              </span>
            ))}
            <span className="rounded px-1 py-0 text-75 font-medium leading-150 text-white bg-primary700 tracking-[-0.2px]">
              {membersData?.data.totalCount ?? members.length}/{squad.capacity} 명
            </span>
          </div>
        </div>
      </div>

      {/* 스쿼드원 목록 */}
      <div className="flex flex-col gap-2.5">
        {members.map((item) => (
          <SquadMemberCard
            key={item.member.id}
            item={item}
            canManage={isLeader && !item.states.isMe && (item.states.canKick || item.states.canDelegateLeader)}
            onManage={() => handleManageMember(item)}
          />
        ))}
      </div>
    </div>
  );
};

export default SquadMembers;
