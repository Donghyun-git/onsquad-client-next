'use client';

import { cn } from '@/shared/lib/utils';
import { Article } from '@/shared/ui/Article';
import { Avatar } from '@/shared/ui/Avatar';
import { Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/ui/button';

interface MemberRank {
  rank: number;
  nickname: string;
}

interface CrewMemberRankingProps {
  members?: MemberRank[];
}

export const CrewMemberRanking = ({ members }: CrewMemberRankingProps) => {
  return (
    <Article
      className="min-h-[280px] w-full p-3"
      slot={
        <>
          <div className="flex items-center justify-between">
            <Text.lg className="font-semibold">
              <h5>크루원 활동 랭킹</h5>
            </Text.lg>

            <Button
              className="active:text-grayscale60 text-grayscale500 hover:bg-[0] hover:text-grayscale600 active:scale-110 active:bg-[0]"
              variant="ghost"
            >
              <Text.xs>랭킹 더보기</Text.xs>
            </Button>
          </div>
          <div className="mt-6">
            <ul>
              {members && members.length > 0 ? (
                members?.map((member, index) => (
                  <li key={index}>
                    <div
                      className={cn(
                        'border-grayScale400 flex items-center gap-3 border-t py-2',
                        index === 0 && 'border-none',
                      )}
                    >
                      <Text.xs className="inline-block font-bold">{member.rank}위</Text.xs>
                      <div className="flex items-center gap-[3px]">
                        <div className="flex items-center gap-0.5">
                          <Avatar className="mr-1 h-5 w-5" />
                          <Text.base className="pt-[0.09rem] font-semibold">{member.nickname}</Text.base>
                        </div>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <li>
                  <Text.lg> 등록된 크루원이 없어요.</Text.lg>
                </li>
              )}
            </ul>
          </div>
        </>
      }
    />
  );
};
