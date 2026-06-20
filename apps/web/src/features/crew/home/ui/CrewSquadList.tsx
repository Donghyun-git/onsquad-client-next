'use client';

import { Plus } from 'lucide-react';

import { Avatar } from '@/shared/ui/Avatar';
import { Badge } from '@/shared/ui/Badge';
import { Card } from '@/shared/ui/Card';
import { PostButton } from '@/shared/ui/PostButton';
import { Text } from '@/shared/ui/Text';

interface Squad {
  title: string;
  categories: string[];
  remain: number;
  capacity: number;
  leader: {
    nickname: string;
  };
  content: string;
}

interface CrewSquadListProps {
  squads?: Squad[];
}

export const CrewSquadList = ({ squads }: CrewSquadListProps) => {
  return (
    <div className="w-full">
      <div className="mb-3 flex items-center justify-between">
        <Text.lg className="font-bold">
          <h5>모집중인 스쿼드</h5>
        </Text.lg>
        <PostButton className="border border-primary" onPageMove={() => alert('스쿼드 모집하기')}>
          <Text.xxs className="ml-1 font-bold">스쿼드 모집하기</Text.xxs>
          <Plus className="pb-0.5" size={10} strokeWidth={2} />
        </PostButton>
      </div>

      <div className="flex flex-col gap-3 pb-10">
        {squads?.map((squad, index) => (
          <Card
            key={index}
            onClick={() => alert('cardlist fuck')}
            title={
              <div className="flex items-center justify-between">
                <Text.sm className="py-3 font-bold">
                  <h5>{squad.title}</h5>
                </Text.sm>
                <div className="flex items-center gap-2">
                  {squad.categories.slice(0, 2).map((tag, index) => (
                    <Badge key={index}>{tag}</Badge>
                  ))}
                  <Badge>
                    {squad.remain}/{squad.capacity} 명
                  </Badge>
                </div>
              </div>
            }
          >
            <div className="flex gap-1">
              <Avatar className="h-4 w-4" />
              <Text.xs className="pt-[0.05rem] font-medium">{squad.leader.nickname}</Text.xs>
            </div>
            <div className="mt-2 line-clamp-4 max-h-14 text-ellipsis">
              <Text.xs className="font-medium">{squad.content}</Text.xs>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
