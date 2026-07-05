import type { ReactNode } from 'react';

import { Zap } from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import { Avatar } from '@/shared/ui/Avatar';
import { Text } from '@/shared/ui/Text';

interface SquadCardProps {
  leaderNickname: string;
  title: string;
  categories: string[];
  capacity: number;
  remain: number;
  isLeader?: boolean;
  showTopAccent?: boolean;
  className?: string;
  children: ReactNode;
}

const SquadCardLabel = ({ children }: { children: ReactNode }) => (
  <span className="shrink-0 rounded bg-primary700 px-s-10 text-[0.625rem] font-medium leading-150 text-white">
    {children}
  </span>
);

const SquadCard = ({
  leaderNickname,
  title,
  categories,
  capacity,
  remain,
  isLeader = false,
  showTopAccent = true,
  className,
  children,
}: SquadCardProps) => {
  return (
    <div className={cn('relative flex flex-col overflow-hidden rounded-lg bg-white', className)}>
      {showTopAccent && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[2px]"
          style={{ background: 'linear-gradient(to right, #BF5000, transparent)' }}
        />
      )}
      <div className="flex flex-col gap-s-10 p-s-20">
        <div className="flex items-center gap-s-10">
          {isLeader && <Zap className="h-[18px] w-[18px] shrink-0 fill-primary500 text-primary500" />}
          <Avatar className="size-4" />
          <Text.sm className="text-grayscale800">{leaderNickname} 님의 스쿼드</Text.sm>
        </div>
        <Text.sm className="font-medium text-grayscale900">{title}</Text.sm>
        <div className="flex flex-wrap items-center gap-s-10">
          {categories.map((category) => (
            <SquadCardLabel key={category}>{category}</SquadCardLabel>
          ))}
          <SquadCardLabel>
            {capacity - remain}/{capacity} 명
          </SquadCardLabel>
        </div>
      </div>

      <div className="flex gap-s-10 p-s-10">{children}</div>
    </div>
  );
};

export default SquadCard;
