'use client';

import { ReactNode } from 'react';

import Image from 'next/image';

import { Avatar } from '@/shared/ui/Avatar';
import { Text } from '@/shared/ui/Text';

export interface CrewCardPropsType {
  /**
   * 카드 타이틀
   */
  title: string;

  /**
   * 크루 대표이미지
   */
  crewImage?: string;

  /**
   * 프로필이미지
   */
  userImage?: string;

  /**
   * 크루 소개글
   */
  description: string;

  /**
   * 크루장 이름
   */
  ownerName: string;

  /**
   * 태그 슬롯
   */
  tagSlot: ReactNode | ReactNode[];

  /**
   * 클릭핸들러
   */
  onClick?: () => void;
}

/**
 * 크루카드
 * @example 
 *  <CrewCard
      title="크루명은 최대 15자 입니다."
      description="크루소개는 아무리 길어도 상관 없습니다. 크루소개는 아무리 길어도 상관 없습니다."
      tagSlot={
        <>
          {['이경학', '이경학', '이경학', '이경학', '화로상회'].map(
            (card, i) => (
              <Badge key={i}>{card}</Badge>
            ),
          )}
        </>
      }
    />
 */
const CrewCard = (props: CrewCardPropsType) => {
  const { title, crewImage, userImage, description, tagSlot, ownerName, onClick } = props;

  return (
    <div
      className="w-[20rem] cursor-pointer rounded-2xl bg-white transition-all duration-200 hover:shadow-md S2:w-full SE:w-full mobile:w-full tablet:w-full"
      onClick={onClick}
    >
      <div className="relative flex h-[15rem] w-[20rem] overflow-hidden rounded-t-lg S2:w-full SE:w-full mobile:w-full tablet:w-full">
        <Image
          src={crewImage || '/images/mock1.png'}
          alt="크루이미지"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100%', height: 'auto' }}
          // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="w-full rounded-t-lg px-4"
        />
        <Text.xl className="bg-gradient-to-t absolute bottom-0 left-0 flex w-full items-center overflow-hidden truncate from-black via-black/30 to-transparent p-2 font-bold text-white backdrop-blur-sm">
          {title}
        </Text.xl>
      </div>
      <div className="flex flex-col gap-2 p-2">
        <div className="flex items-center gap-2">
          <Avatar className="h-5 w-5" imageUrl={userImage} />
          <Text.sm className="font-semibold text-black">{ownerName}</Text.sm>
        </div>
        <Text.sm className="overflow-hidden truncate text-ellipsis font-medium text-black">{description}</Text.sm>
      </div>
      <div className="no-scrollbar flex gap-1 overflow-x-auto whitespace-nowrap rounded-b-[1.1rem] px-2 py-1.5">
        {tagSlot}
      </div>
    </div>
  );
};

export default CrewCard;
