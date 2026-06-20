'use client';

import React from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';

import { crewQueries } from '@/entities/crew/api/crew.queries';

import { PATH } from '@/shared/config/paths';
import { usePageMove } from '@/shared/lib/hooks';
import { Badge } from '@/shared/ui/Badge';
import { CrewCard } from '@/shared/ui/Card/CrewCard';
import { PostButton } from '@/shared/ui/PostButton';
import { Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/ui/button';

/**
 * 나의 크루 탭
 */
const MyCrew = () => {
  const { handlePageMove } = usePageMove();
  const { data: myCrewList } = useSuspenseQuery(crewQueries.myCrewList());

  return (
    <>
      <div className="flex items-center gap-2 py-6">
        <Text.lg className="font-semibold">
          <h3>내가 개설한 크루</h3>
        </Text.lg>
        <Button className="mb-0.5 h-fit p-2 pb-1.5" variant="ghost">
          <Text.base className="text-[#464646]">더 보기</Text.base>
        </Button>
      </div>
      <div>
        <div className="grid grid-cols-2 gap-3 S2:grid-cols-1 SE:grid-cols-1 mobile:grid-cols-1 tablet:grid-cols-1">
          {myCrewList && myCrewList.length > 0 ? (
            myCrewList.map((crew) => (
              <CrewCard
                key={crew.id}
                ownerName={crew.owner.nickname}
                title={crew.name}
                description={crew.introduce}
                crewImage={crew.imageUrl}
                tagSlot={
                  <>
                    {crew.hashtags.map((hashtag) => (
                      <Badge key={hashtag}>{hashtag}</Badge>
                    ))}
                  </>
                }
                onClick={() => handlePageMove(`/crews/${crew.id}`, { scroll: false })}
              />
            ))
          ) : (
            <div className="col-span-2 py-8 text-center text-gray-500">개설한 크루가 없습니다.</div>
          )}
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between gap-2 pb-6 pt-[30px]">
          <Text.lg className="font-semibold">
            <h3>나의 크루</h3>
          </Text.lg>
          <PostButton className="mr-4 px-2" onPageMove={() => handlePageMove(PATH.community)}>
            <Text.xxs className="ml-1 font-bold">모집중인 크루 보러가기</Text.xxs>
          </PostButton>
        </div>
        <div className="grid grid-cols-2 gap-3 S2:grid-cols-1 SE:grid-cols-1 mobile:grid-cols-1 tablet:grid-cols-1">
          <CrewCard
            title="크루명은 최대 15자 입니다."
            ownerName="이경학"
            description="크루소개는 아무리 길어도 상관 없습니다. 크루소개는 아무리 길어도 상관 없습니다."
            tagSlot={
              <>
                {['이경학', '이경학', '이경학', '이경학', '화로상회'].map((card, i) => (
                  <Badge key={i}>{card}</Badge>
                ))}
              </>
            }
          />
          <CrewCard
            title="크루명은 최대 15자 입니다."
            ownerName="이경학"
            description="크루소개는 아무리 길어도 상관 없습니다. 크루소개는 아무리 길어도 상관 없습니다."
            tagSlot={
              <>
                {['이경학', '이경학', '이경학', '이경학', '화로상회'].map((card, i) => (
                  <Badge key={i}>{card}</Badge>
                ))}
              </>
            }
          />
        </div>
      </div>
    </>
  );
};

export default MyCrew;
