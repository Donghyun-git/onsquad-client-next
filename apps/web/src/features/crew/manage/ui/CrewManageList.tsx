'use client';

import { useQuery } from '@tanstack/react-query';
import { overlay } from 'overlay-kit';

import { crewQueries } from '@/entities/crew';

import { PATH } from '@/shared/config/paths';
import { usePageMove } from '@/shared/lib/hooks';
import { closeWithAnimation } from '@/shared/lib/overlay';
import { Alert } from '@/shared/ui/Alert';
import { BUTTON } from '@/shared/ui/Alert/style';
import { CountLabel } from '@/shared/ui/CountLabel';
import { NavButton } from '@/shared/ui/NavButton';
import { Text } from '@/shared/ui/Text';
import { Button as OverlayButton } from '@/shared/ui/ui/button';

import { useDeleteCrewMutation } from '../model/useDeleteCrewMutation';

interface CrewManageListProps {
  crewId: number;
}

const CrewManageList = ({ crewId }: CrewManageListProps) => {
  const { handlePageMove } = usePageMove();

  const { data: manageRes } = useQuery(crewQueries.manage({ crewId }));
  const { mutate: deleteMutate, isPending: isDeletePending } = useDeleteCrewMutation({ crewId });

  const data = manageRes?.data;

  const canModify = data?.states?.canModify;
  const canDelete = data?.states?.canDelete;
  const requestCnt = data?.requestCnt;
  const squadCnt = data?.squadCnt;
  const memberCnt = data?.memberCnt;

  return (
    <>
      <div className="flex grow flex-col gap-2">
        {canModify && (
          <NavButton>
            <Text.sm>크루정보 수정</Text.sm>
          </NavButton>
        )}

        <NavButton onClick={() => handlePageMove(`${PATH.crews}/${crewId}/manage/participants`)}>
          <div className="flex items-center gap-2">
            <Text.sm>참가 신청</Text.sm>
            <CountLabel count={requestCnt} />
          </div>
        </NavButton>
        <NavButton>
          <div className="flex items-center gap-2">
            <Text.sm>스쿼드</Text.sm>
            <CountLabel count={squadCnt} />
          </div>
        </NavButton>
        <NavButton onClick={() => handlePageMove(`${PATH.crews}/${crewId}/manage/members`)}>
          <div className="flex items-center gap-2">
            <Text.sm>크루원</Text.sm>
            <CountLabel count={memberCnt} />
          </div>
        </NavButton>
      </div>

      {canDelete && (
        <button
          className="mx-auto w-fit border-b border-grayscale500 text-grayscale500 disabled:opacity-50"
          disabled={isDeletePending}
          onClick={() => {
            overlay.open(({ isOpen, close, unmount }) => {
              const handleClose = () => closeWithAnimation(close, unmount);
              return (
                <Alert
                  isOpen={isOpen}
                  title="크루를 삭제할까요?"
                  buttonSlot={
                    <div className="grid grid-cols-2">
                      <OverlayButton className={BUTTON.CANCEL} onClick={handleClose}>
                        취소
                      </OverlayButton>
                      <OverlayButton
                        className={BUTTON.ACTION}
                        onClick={() => {
                          handleClose();
                          deleteMutate(undefined, { onSuccess: () => handlePageMove(PATH.crews) });
                        }}
                      >
                        삭제
                      </OverlayButton>
                    </div>
                  }
                >
                  삭제된 크루는 복구할 수 없습니다.
                </Alert>
              );
            });
          }}
        >
          <Text.sm>크루 삭제</Text.sm>
        </button>
      )}
    </>
  );
};

export default CrewManageList;
