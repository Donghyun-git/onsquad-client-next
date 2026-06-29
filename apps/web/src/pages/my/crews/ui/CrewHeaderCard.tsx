'use client';

import { ChevronRight, Zap } from 'lucide-react';
import Image from 'next/image';

import { Text } from '@/shared/ui/Text';

interface CrewHeaderCardProps {
  name: string;
  imageUrl: string;
  ownerNickname: string;
  isOwner: boolean;
}

/** 내 크루/스쿼드 탭에서 공통으로 쓰는 크루 헤더(이미지 + 크루명 + 크루장 정보). */
const CrewHeaderCard = ({ name, imageUrl, ownerNickname, isOwner }: CrewHeaderCardProps) => {
  return (
    <>
      <div className="relative flex w-full items-end">
        <Image src={imageUrl || '/images/mock1.png'} alt={name} fill className="object-cover" loading="eager" />
        <div className="bg-gradient-to-b relative flex w-full items-start justify-between from-black/10 to-black/30 px-s-20 py-s-30 backdrop-blur-[4px]">
          <Text.xl className="font-bold leading-130 text-white">{name}</Text.xl>
          <ChevronRight className="h-6 w-6 shrink-0 text-white" />
        </div>
      </div>

      <div className="flex items-center gap-s-10 p-s-20">
        <div className="relative h-6 w-6 shrink-0">
          <Image
            src="/icons/no_profile.svg"
            alt=""
            width={24}
            height={24}
            className="h-full w-full rounded-full object-cover"
          />
          {isOwner && (
            <span
              aria-label="내 크루"
              className="absolute -left-s-10 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary500"
            >
              <Zap className="h-3 w-3 fill-white text-white" />
            </span>
          )}
        </div>
        <Text.xxs className="font-semibold text-grayscale900">{ownerNickname} 크루장</Text.xxs>
      </div>
    </>
  );
};

export default CrewHeaderCard;
