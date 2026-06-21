'use client';

import { Text } from '@/shared/ui/Text';
import { Appbar } from '@/shared/ui/Appbar';

import MySquadCard, { type SquadCardItem } from './MySquadCard';

const MOCK_MY_SQUADS: SquadCardItem[] = [
  {
    id: 1,
    name: '기타 앙상블',
    description: '함께 기타를 연주하는 스쿼드입니다.',
    ownerName: '이경학',
    hashtags: ['기타', '앙상블', '음악'],
    memberCount: 4,
    maxMemberCount: 8,
  },
  {
    id: 2,
    name: '재즈 즉흥 연주',
    description: '재즈를 자유롭게 즐기는 스쿼드입니다.',
    ownerName: '김민준',
    hashtags: ['재즈', '즉흥', '피아노'],
    memberCount: 3,
    maxMemberCount: 6,
  },
  {
    id: 3,
    name: '드럼 비트메이킹',
    description: '드럼과 비트를 함께 만들어요.',
    ownerName: '박서준',
    hashtags: ['드럼', '비트', 'EDM'],
    memberCount: 5,
    maxMemberCount: 10,
  },
];

const MySquadList = () => {
  return (
    <>
      <Appbar />
      <div className="pt-14">
        <div className="bg-grayscale50 px-s-40 py-s-60">
          <div className="mb-s-30 flex items-center gap-s-20">
            <Text.lg className="font-semibold">나의 스쿼드</Text.lg>
            <Text.sm className="text-grayscale500">총 {MOCK_MY_SQUADS.length}개</Text.sm>
          </div>

          {MOCK_MY_SQUADS.length > 0 ? (
            <div className="flex flex-col gap-s-30">
              {MOCK_MY_SQUADS.map((squad) => (
                <MySquadCard key={squad.id} squad={squad} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <Text.base className="text-grayscale500">속한 스쿼드가 없습니다.</Text.base>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MySquadList;
