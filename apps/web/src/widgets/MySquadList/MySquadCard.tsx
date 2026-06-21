import Image from 'next/image';

import { Avatar } from '@/shared/ui/Avatar';
import { Badge } from '@/shared/ui/Badge';
import { Text } from '@/shared/ui/Text';

export type SquadCardItem = {
  id: number;
  name: string;
  description: string;
  ownerName: string;
  imageUrl?: string;
  memberCount: number;
  maxMemberCount: number;
  hashtags: string[];
};

interface MySquadCardProps {
  squad: SquadCardItem;
  onClick?: () => void;
}

const MySquadCard = ({ squad, onClick }: MySquadCardProps) => {
  return (
    <div
      className="cursor-pointer overflow-hidden rounded-2xl bg-white transition-all duration-200 hover:shadow-md"
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={squad.name}
    >
      {/* 썸네일 */}
      <div className="relative h-40 w-full overflow-hidden rounded-t-2xl">
        <Image
          src={squad.imageUrl || '/images/mock1.png'}
          alt={squad.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/50 to-black/10 px-s-20 py-s-30">
          <Text.xl className="font-bold text-white leading-tight">{squad.name}</Text.xl>
        </div>
      </div>

      {/* 오너 & 인원 */}
      <div className="flex items-center justify-between p-s-20">
        <div className="flex items-center gap-s-10">
          <Avatar className="h-6 w-6" />
          <Text.xs className="font-semibold text-grayscale900">{squad.ownerName}</Text.xs>
        </div>
        <Text.xs className="text-grayscale500">
          {squad.memberCount}/{squad.maxMemberCount}명
        </Text.xs>
      </div>

      {/* 설명 */}
      <div className="px-s-20 pb-s-10">
        <Text.sm className="truncate text-grayscale700">{squad.description}</Text.sm>
      </div>

      {/* 해시태그 */}
      <div className="no-scrollbar flex gap-s-10 overflow-x-auto whitespace-nowrap px-s-20 pb-s-20">
        {squad.hashtags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>
    </div>
  );
};

export default MySquadCard;
