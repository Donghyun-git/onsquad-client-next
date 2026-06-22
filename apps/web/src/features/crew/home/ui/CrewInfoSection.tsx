'use client';

import { Article } from '@/shared/ui/Article';
import { Avatar } from '@/shared/ui/Avatar';
import { Badge } from '@/shared/ui/Badge';
import { Text } from '@/shared/ui/Text';

interface CrewInfoSectionProps {
  crew?: {
    name: string;
    owner: {
      nickname: string;
    };
    introduce: string;
    detail: string;
    hashtags: string[];
    memberCount: number;
  };
}

export const CrewInfoSection = ({ crew }: CrewInfoSectionProps) => {
  return (
    <Article
      className="h-[360px] w-full p-3"
      slot={
        <div className="flex h-full flex-col gap-3">
          <Text.lg className="mb-1 font-bold">
            <h5>{crew?.name}</h5>
          </Text.lg>

          <div className="flex flex-col gap-2">
            <div className="mb-1 flex items-center gap-2">
              <Text.base className="font-semibold">크루장</Text.base>
              <div className="flex gap-1">
                <Avatar className="h-4 w-4" />
                <Text.xs className="pt-[0.05rem] font-medium">{crew?.owner.nickname}</Text.xs>
              </div>
            </div>
            <Text.xs>{crew?.introduce}</Text.xs>
          </div>

          <div className="mt-1 flex grow flex-col gap-2">
            <Text.base className="mb-1 font-semibold">
              <h5>크루 상세정보</h5>
            </Text.base>
            <Text.xs>{crew?.detail}</Text.xs>
          </div>

          <div className="flex flex-wrap items-center gap-1">
            <Badge>멤버 수 {crew?.memberCount} 명</Badge>
            {crew?.hashtags.map((tag, index) => (
              <Badge key={index}>{tag}</Badge>
            ))}
          </div>
        </div>
      }
    />
  );
};
