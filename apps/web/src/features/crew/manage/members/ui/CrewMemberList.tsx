'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { overlay } from 'overlay-kit';

import { crewQueries } from '@/entities/crew';

import type { CrewMemberItem } from '@/shared/api/crew/manage/members';
import { OVERLAY_ANIMATION_DURATION } from '@/shared/config';
import { closeWithAnimation } from '@/shared/lib/overlay';
import { Alert } from '@/shared/ui/Alert';
import { BUTTON } from '@/shared/ui/Alert/style';
import { BottomSheet } from '@/shared/ui/BottomSheet';
import { Button } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { Button as OverlayButton } from '@/shared/ui/ui/button';

import { useDelegateCrewOwnerMutation } from '../model/useDelegateCrewOwnerMutation';
import { useKickCrewMemberMutation } from '../model/useKickCrewMemberMutation';
import CrewMemberCard from './CrewMemberCard';
import CrewMemberProfileSheet from './CrewMemberProfileSheet';

interface CrewMemberListProps {
  crewId: number;
}

const CrewMemberList = ({ crewId }: CrewMemberListProps) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(
    crewQueries.members({ crewId }),
  );

  const kickMutation = useKickCrewMemberMutation(crewId);
  const delegateMutation = useDelegateCrewOwnerMutation(crewId);

  const members = data?.pages.flatMap((page) => page.data.results) ?? [];
  const totalCount = data?.pages[0]?.data.totalCount ?? 0;
  const totalPages = data?.pages[0]?.data.totalPages ?? 0;
  const loadedPages = data?.pages.length ?? 0;

  const openProfile = (item: CrewMemberItem) => {
    overlay.open(({ isOpen, close, unmount }) => {
      const handleClose = () => closeWithAnimation(close, unmount);
      return <CrewMemberProfileSheet item={item} isOpen={isOpen} onClose={handleClose} />;
    });
  };

  const confirmKick = (item: CrewMemberItem) => {
    const { nickname, id } = item.member;
    overlay.open(({ isOpen, close, unmount }) => {
      const handleClose = () => closeWithAnimation(close, unmount);
      return (
        <Alert
          isOpen={isOpen}
          title="크루원을 강퇴할까요?"
          buttonSlot={
            <div className="grid grid-cols-2">
              <OverlayButton className={BUTTON.CANCEL} onClick={handleClose}>
                취소
              </OverlayButton>
              <OverlayButton
                className={BUTTON.ACTION}
                onClick={() => {
                  handleClose();
                  kickMutation.mutate(id);
                }}
              >
                강퇴
              </OverlayButton>
            </div>
          }
        >
          {nickname} 님을 크루에서 강퇴합니다.
        </Alert>
      );
    });
  };

  const confirmDelegate = (item: CrewMemberItem) => {
    const { nickname, id } = item.member;
    overlay.open(({ isOpen, close, unmount }) => {
      const handleClose = () => closeWithAnimation(close, unmount);
      return (
        <Alert
          isOpen={isOpen}
          title={`${nickname} 님에게 크루장을 위임할까요?`}
          buttonSlot={
            <div className="grid grid-cols-2">
              <OverlayButton className={BUTTON.CANCEL} onClick={handleClose}>
                취소
              </OverlayButton>
              <OverlayButton
                className={BUTTON.ACTION}
                onClick={() => {
                  handleClose();
                  delegateMutation.mutate(id);
                }}
              >
                위임
              </OverlayButton>
            </div>
          }
        >
          {nickname} 님에게 크루장 권한을 위임합니다.
        </Alert>
      );
    });
  };

  const openMenu = (item: CrewMemberItem) => {
    overlay.open(({ isOpen, close, unmount }) => {
      const handleClose = () => closeWithAnimation(close, unmount);
      return (
        <BottomSheet title={`${item.member.nickname} 님`} isOpen={isOpen} onClose={handleClose}>
          <div className="flex flex-col gap-2">
            {item.states.canDelegateOwner && (
              <OverlayButton
                variant="ghost"
                className="justify-start"
                onClick={() => {
                  handleClose();
                  setTimeout(() => confirmDelegate(item), OVERLAY_ANIMATION_DURATION);
                }}
              >
                크루장 위임
              </OverlayButton>
            )}
            {item.states.canKick && (
              <OverlayButton
                variant="ghost"
                className="justify-start"
                onClick={() => {
                  handleClose();
                  setTimeout(() => confirmKick(item), OVERLAY_ANIMATION_DURATION);
                }}
              >
                강퇴
              </OverlayButton>
            )}
          </div>
        </BottomSheet>
      );
    });
  };

  if (members.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Text.sm className="text-grayscale500">크루원이 없습니다</Text.sm>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <Text.sm className="font-semibold text-grayscale900">크루원 {totalCount}명</Text.sm>

      <ul className="flex flex-col gap-2">
        {members.map((item) => (
          <CrewMemberCard
            key={item.member.id}
            item={item}
            onOpenMenu={() => openMenu(item)}
            onOpenProfile={() => openProfile(item)}
          />
        ))}
      </ul>

      {hasNextPage && (
        <Button
          variant="ghost"
          isLoading={isFetchingNextPage}
          onClick={() => fetchNextPage()}
          className="mx-auto h-auto rounded-full bg-primary50 px-4 py-2 text-sm font-medium text-primary700 hover:bg-primary50 hover:text-primary700"
        >
          더보기 {loadedPages}/{totalPages}
        </Button>
      )}
    </div>
  );
};

export default CrewMemberList;
