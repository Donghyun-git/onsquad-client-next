'use client';

import { useRouter } from 'next/navigation';

import { Settings } from 'lucide-react';
import Image from 'next/image';

import type { CrewHomeData } from '@/entities/crew';

import { CREW_IMAGE_OVERLAY_CLASS } from '@/shared/config';
import { PATH } from '@/shared/config/paths';
import { Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/ui/button';

interface CrewHeaderProps {
  crew?: PropType<CrewHomeData, 'crew'>;
  canManage?: boolean;
}

export const CrewHeader = ({ crew, canManage }: CrewHeaderProps) => {
  const router = useRouter();

  const handleManageClick = () => {
    router.push(`${PATH.crews}/${crew?.id}/manage`, {
      scroll: false,
    });
  };

  return (
    <div className="h-full w-full cursor-pointer bg-white transition-all duration-200 hover:shadow-md S2:w-full SE:w-full mobile:w-full tablet:w-full">
      <div className="relative h-[calc(50dvh-var(--app-header-height))] w-full overflow-hidden S2:w-full SE:w-full mobile:w-full tablet:w-full">
        <Image
          src={crew?.imageUrl || '/images/mock1.png'}
          alt="크루이미지"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="w-full px-4"
          loading="eager"
        />
        <div className={CREW_IMAGE_OVERLAY_CLASS}>
          <div className="flex h-[5dvh] items-center justify-between">
            <Text.base className="font-medium">크루 스페이스</Text.base>

            {canManage && (
              <Button
                variant="ghost"
                className="px-2 text-grayscale50 hover:bg-[0] hover:text-inherit active:scale-110 active:bg-[0]"
                onClick={handleManageClick}
              >
                <Settings size={20} />
              </Button>
            )}
          </div>
          <Text.xl className="font-semibold">{crew?.name}</Text.xl>
        </div>
      </div>
    </div>
  );
};
