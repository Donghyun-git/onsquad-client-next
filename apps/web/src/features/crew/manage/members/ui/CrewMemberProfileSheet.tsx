'use client';

import type { CrewMemberItem } from '@/shared/api/crew/manage/members';
import { Avatar } from '@/shared/ui/Avatar';
import { BottomSheet } from '@/shared/ui/BottomSheet';
import { Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/ui/button';

interface CrewMemberProfileSheetProps {
  item: CrewMemberItem;
  isOpen: boolean;
  onClose: () => void;
}

const CrewMemberProfileSheet = ({ item, isOpen, onClose }: CrewMemberProfileSheetProps) => {
  const { member } = item;
  const mbtiLabel = member.mbti || '신비주의';

  return (
    <BottomSheet title="프로필" isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 rounded-xl bg-grayscale50 p-3">
          <div className="flex items-center gap-2">
            <Avatar className="size-6 shrink-0" />
            <Text.sm className="font-medium tracking-tight text-grayscale900">{member.nickname}</Text.sm>
          </div>
          <Text.sm className="tracking-tight text-grayscale900">{member.introduce}</Text.sm>
        </div>

        <div className="flex items-center justify-between">
          <Text.sm className="text-grayscale500">MBTI</Text.sm>
          <Text.sm className="font-medium text-grayscale900">{mbtiLabel}</Text.sm>
        </div>

        <Button className="w-full" onClick={onClose}>
          닫기
        </Button>
      </div>
    </BottomSheet>
  );
};

export default CrewMemberProfileSheet;
