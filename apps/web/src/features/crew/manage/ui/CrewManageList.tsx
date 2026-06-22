'use client';

import { useRouter } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';

import { crewQueries } from '@/entities/crew';

import { PATH } from '@/shared/config/paths';
import { CountLabel } from '@/shared/ui/CountLabel';
import { NavButton } from '@/shared/ui/NavButton';
import { Text } from '@/shared/ui/Text';

interface CrewManageListProps {
  crewId: number;
}

const CrewManageList = ({ crewId }: CrewManageListProps) => {
  const router = useRouter();

  const { data: manageRes } = useQuery(crewQueries.manage({ crewId }));

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

        <NavButton onClick={() => router.push(`${PATH.crews}/${crewId}/manage/participants`)}>
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
        <NavButton>
          <div className="flex items-center gap-2">
            <Text.sm>크루원</Text.sm>
            <CountLabel count={memberCnt} />
          </div>
        </NavButton>
      </div>

      {canDelete && (
        <button className="mx-auto w-fit border-b border-grayscale500 text-grayscale500">
          <Text.sm>크루 삭제</Text.sm>
        </button>
      )}
    </>
  );
};

export default CrewManageList;
