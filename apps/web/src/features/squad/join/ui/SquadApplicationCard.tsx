import Image from 'next/image';

import type { SquadApplication } from '@/entities/squad';
import { Avatar } from '@/shared/ui/Avatar';

interface SquadApplicationCardProps {
  application: SquadApplication;
}

const SquadApplicationCard = ({ application }: SquadApplicationCardProps) => {
  return (
    <div className="overflow-hidden rounded-lg bg-white">
      {/* 크루 이미지 + 이름 */}
      <div className="relative flex items-end justify-center overflow-hidden">
        <div className="h-24 w-full bg-grayscale200 relative">
          {application.crewImageUrl && (
            <Image
              src={application.crewImageUrl}
              alt={application.crewName}
              fill
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/9 to-black/30 backdrop-blur-sm" />
          <div className="absolute inset-x-0 bottom-0 px-2 py-3">
            <p className="text-500 font-bold leading-130 text-white tracking-[-0.4px]">
              {application.crewName}
            </p>
          </div>
        </div>
      </div>

      {/* 스쿼드 정보 */}
      <div className="flex flex-col gap-1 bg-white p-2">
        <div className="flex items-center gap-1">
          <Avatar className="size-4" />
          <span className="text-200 font-regular leading-130 text-grayscale800 tracking-[-0.28px]">
            {application.authorNickname}
          </span>
          <span className="text-200 font-regular leading-130 text-grayscale800 tracking-[-0.28px]">
            님의 스쿼드
          </span>
        </div>
        <p className="text-200 font-medium leading-130 text-grayscale900 tracking-[-0.28px]">
          {application.squadTitle}
        </p>
        <div className="flex items-center gap-1">
          <span className="rounded px-1 py-0 text-75 font-medium leading-150 text-white bg-primary700 tracking-[-0.2px]">
            {application.category}
          </span>
          <span className="rounded px-1 py-0 text-75 font-medium leading-150 text-white bg-primary700 tracking-[-0.2px]">
            {application.currentMembers}/{application.maxMembers} 명
          </span>
        </div>
      </div>

      {/* 액션 버튼 */}
      <div className="flex gap-1 p-1">
        <button
          type="button"
          className="flex flex-1 items-center justify-center rounded p-2 border border-grayscale500"
          aria-label="합류신청 취소하기"
        >
          <span className="text-100 font-medium leading-130 text-grayscale500 tracking-[-0.24px]">취소하기</span>
        </button>
        <button
          type="button"
          className="flex flex-1 items-center justify-center rounded p-2 bg-primary700"
          aria-label="수락 대기 상태 확인"
        >
          <span className="text-100 font-medium leading-130 text-primary50 tracking-[-0.24px]">수락 대기중</span>
        </button>
      </div>
    </div>
  );
};

export default SquadApplicationCard;
