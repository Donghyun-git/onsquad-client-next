'use client';

import { useRouter } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';
import { CircleX } from 'lucide-react';
import Image from 'next/image';
import { overlay } from 'overlay-kit';

import { LoginAlert } from '@/widgets/LoginAlert';

import { crewQueries } from '@/entities/crew/api/crew.queries';

import { TOAST } from '@/shared/config/toast';
import { useToast } from '@/shared/lib/hooks/useToast';
import { useUserStore } from '@/shared/lib/store/useUserStore';
import { cn } from '@/shared/lib/utils';
import { Alert } from '@/shared/ui/Alert';
import { Avatar } from '@/shared/ui/Avatar';
import { Badge } from '@/shared/ui/Badge';
import { Button } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';

import { useCancelRequestMutation } from '../model/useCancelRequestMutation';
import { useCrewRequestMutation } from '../model/useCrewRequestMutation';

interface CrewDetailProps {
  crewId: number;
}

export const CrewDetail = ({ crewId }: CrewDetailProps) => {
  const router = useRouter();

  const user = useUserStore((state) => state.user);

  const { toast, hide } = useToast();

  const { mutateAsync: crewRequestMutate, isPending: isCrewRequestPending } = useCrewRequestMutation({ crewId });
  const { mutateAsync: cancelRequestMutate, isPending: isCancelRequestPending } = useCancelRequestMutation({ crewId });

  const { data: crewDetail } = useQuery(crewQueries.detail({ crewId }));

  const data = crewDetail?.data;

  const isGuestUser = !user;
  const alreadyParticipant = data?.states.alreadyParticipant ?? false;
  const alreadyRequest = data?.states.alreadyRequest ?? false;
  const isOwner = alreadyParticipant && data?.owner.nickname === user?.nickname;

  const handleCrewHomeMove = () => {
    if (alreadyParticipant) {
      router.push(`/crews/${data?.id}/home`, {
        scroll: false,
      });
    } else {
      if (isGuestUser) {
        overlay.open((overlayProps) => <LoginAlert {...overlayProps} />);
      } else {
        overlay.open((overlayProps) => (
          <Alert {...overlayProps}>현재 크루에 속해있지 않아요. 참가 신청을 눌러 먼저 크루에 가입해주세요!</Alert>
        ));
      }
    }
  };

  const handleCrewRequest = async () => {
    await crewRequestMutate(crewId);

    toast({
      title: '가입 신청이 완료되었어요',
      icon: <CircleX onClick={() => hide()} />,
      className: TOAST.primary,
    });
  };

  const handleCancelRequest = async () => {
    await cancelRequestMutate(crewId);
  };

  return (
    <div className="-mx-5 -mt-5 min-h-[calc(100dvh-var(--app-header-height))] bg-white px-0">
      <div
        className="w-full cursor-pointer transition-all duration-200 hover:shadow-md S2:w-full SE:w-full mobile:w-full tablet:w-full"
        onClick={handleCrewHomeMove}
      >
        <div className="relative h-[calc(50dvh-var(--app-header-height))] w-full overflow-hidden S2:w-full SE:w-full mobile:w-full tablet:w-full">
          {data ? (
            <Image
              src={data.imageUrl || '/images/mock1.png'}
              alt="크루이미지"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="w-full px-4"
              loading="eager"
            />
          ) : null}

          <div className="bg-gradient-to-t absolute bottom-0 left-0 flex w-full flex-col gap-3 overflow-hidden truncate bg-black bg-opacity-20 from-black via-black/30 to-transparent px-5 py-2 font-bold text-white backdrop-blur-sm">
            <div className="flex h-[5dvh] items-center justify-between">
              <Text.base className="font-medium">크루 스페이스</Text.base>

              <div className="flex items-center gap-2">
                {alreadyParticipant ? <Badge className="bg-primary300 text-black">참여중인 크루</Badge> : null}
                {isOwner ? <Badge className="bg-primary400 text-black">크루장</Badge> : null}
              </div>
            </div>
            <Text.xl className="font-semibold">{data?.name}</Text.xl>
          </div>
        </div>
      </div>

      <div className="mb-6 px-5">
        <div className="my-6">
          <div className="flex flex-col gap-2">
            <div className="flex gap-3">
              <h4>
                <Text.xl className="font-bold">크루장</Text.xl>
              </h4>
              <div className="flex items-center gap-2">
                <Avatar className="h-5 w-5" />
                <Text.xs className="font-semibold text-black">{data?.owner?.nickname}</Text.xs>
                <Text.xs>{data?.owner.mbti ?? '신비주의'}</Text.xs>
              </div>
            </div>
            <Text.base className="font-medium">
              <p>{data?.introduce}</p>
            </Text.base>
          </div>
        </div>

        <div className="my-6">
          <div className="flex flex-col gap-2">
            <h4>
              <Text.xl className="font-bold">크루 상세정보</Text.xl>
            </h4>
            <Text.base className="font-medium">
              <p>{data?.detail}</p>
            </Text.base>
          </div>
        </div>

        <div className="tagArea my-6 flex flex-wrap items-center gap-2">
          {data?.hashtags.map((tag, index) => {
            if (index === 0) {
              return <Badge key={index}>멤버 수 {tag}+</Badge>;
            }
            return <Badge key={index}>{tag}</Badge>;
          })}
        </div>

        {!isGuestUser && !alreadyParticipant && !isOwner && (
          <div className="buttonArea flex flex-col items-center gap-4 pb-12 pt-6">
            <Button
              className={cn(`w-full disabled:cursor-not-allowed disabled:bg-grayscale100 disabled:text-grayscale500`)}
              disabled={alreadyRequest || isCrewRequestPending}
              onClick={handleCrewRequest}
              isLoading={isCrewRequestPending}
            >
              {alreadyRequest ? '가입 신청 완료' : '가입 신청하기'}
            </Button>
            {data?.states.alreadyRequest ? (
              <Button
                className="!bg-none w-fit"
                variant="ghost"
                onClick={handleCancelRequest}
                isLoading={isCancelRequestPending}
              >
                취소
              </Button>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};
