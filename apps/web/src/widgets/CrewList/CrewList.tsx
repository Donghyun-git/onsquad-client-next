'use client';

import { useRouter } from 'next/navigation';

import { Plus } from 'lucide-react';

import { type CrewListData } from '@/entities/crew';

import { PATH } from '@/shared/config/paths';
import { Article } from '@/shared/ui/Article';
import { Badge } from '@/shared/ui/Badge';
import { CrewCard } from '@/shared/ui/Card/CrewCard';
import { PostButton } from '@/shared/ui/PostButton';
import { Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/ui/button';

export type CrewDataType = ArrayType<CrewListData>;

interface CrewListPropsType {
  list: CrewDataType[];
}

const CrewList = ({ list }: CrewListPropsType) => {
  const router = useRouter();

  return (
    <>
      <Article
        className="min-h-96 w-full bg-inherit px-0"
        slot={
          <div>
            <div className="flex items-center justify-between">
              <Text.lg className="font-semibold">
                <h3>모집중인 크루</h3>
              </Text.lg>
              <PostButton className="shadow-sm" onPageMove={() => router.push(PATH.addCrew, { scroll: false })}>
                <Text.xxs className="ml-1 font-bold">크루 개설하기</Text.xxs>
                <Plus size={12} strokeWidth={2} />
              </PostButton>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-6 S2:grid-cols-1 SE:grid-cols-1 mobile:grid-cols-1 tablet:grid-cols-1">
              {list && list.length > 0
                ? list.map((crew, index) => (
                    <CrewCard
                      key={index}
                      crewImage={crew?.imageUrl || ''}
                      ownerName={crew.owner?.nickname || ''}
                      title={crew.name}
                      description={crew?.introduce || ''}
                      tagSlot={
                        <>
                          {crew.hashtags.map((tag, i) => {
                            if (i === 0) {
                              return <Badge key={i}>멤버 수 {tag}+</Badge>;
                            }
                            return <Badge key={i}>{tag}</Badge>;
                          })}
                        </>
                      }
                      onClick={() => router.push(`/crews/${crew.id}`, { scroll: false })}
                    />
                  ))
                : null}
            </div>
          </div>
        }
      />
      <div className="flex justify-center pb-12">
        <Button
          className="h-fit p-2 font-semibold text-[#909090] hover:text-[#6C6C6C] active:text-[#464646]"
          variant="ghost"
          onClick={() => router.push(PATH.community, { scroll: true })}
        >
          모집중인 크루 더 보러가기
        </Button>
      </div>
    </>
  );
};

export default CrewList;
