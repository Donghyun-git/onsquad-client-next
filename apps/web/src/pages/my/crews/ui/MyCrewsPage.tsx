import { Appbar } from '@/shared/ui/Appbar';
import { Badge } from '@/shared/ui/Badge';
import { CrewCard } from '@/shared/ui/Card/CrewCard';
import { Text } from '@/shared/ui/Text';

const MOCK_MY_CREWS = [
  {
    id: 1,
    name: '공격적인 음악회 크루',
    introduce: '함께 음악을 즐기는 크루입니다.',
    owner: { nickname: '홍길동' },
    imageUrl: undefined,
    hashtags: ['음악', '밴드', '클래식'],
  },
  {
    id: 2,
    name: '러닝 클럽',
    introduce: '매주 함께 달리는 크루입니다.',
    owner: { nickname: '이경학' },
    imageUrl: undefined,
    hashtags: ['러닝', '건강', '운동'],
  },
];

const MyCrewsPage = () => {
  return (
    <>
      <Appbar isMenuHeader={false} title="내 크루" />
      <div className="min-h-screen bg-grayscale50 pt-14">
        <div className="px-s-40 py-s-60">
          <div className="mb-s-30 flex items-center gap-s-20">
            <Text.lg className="font-semibold">내가 속한 크루</Text.lg>
            <Text.sm className="text-grayscale500">총 {MOCK_MY_CREWS.length}개</Text.sm>
          </div>
          <div className="flex flex-col gap-s-30">
            {MOCK_MY_CREWS.length > 0 ? (
              MOCK_MY_CREWS.map((crew) => (
                <CrewCard
                  key={crew.id}
                  title={crew.name}
                  ownerName={crew.owner.nickname}
                  description={crew.introduce}
                  crewImage={crew.imageUrl}
                  tagSlot={
                    <>
                      {crew.hashtags.map((tag) => (
                        <Badge key={tag}>{tag}</Badge>
                      ))}
                    </>
                  }
                />
              ))
            ) : (
              <div className="py-16 text-center">
                <Text.base className="text-grayscale500">속한 크루가 없습니다.</Text.base>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyCrewsPage;
