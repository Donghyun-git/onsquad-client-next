'use client';

import { useRouter, useSelectedLayoutSegments } from 'next/navigation';

import { Plus, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { overlay } from 'overlay-kit';

import { LoginAlert } from '@/shared/ui/LoginAlert';

import { PATH } from '@/shared/config/paths';
import { TAB_MENUS } from '@/shared/config/tabs';
import { useUser } from '@/shared/lib/hooks';
import { cn } from '@/shared/lib/utils';

const BottomTab = () => {
  const segments = useSelectedLayoutSegments();
  const router = useRouter();

  const user = useUser();

  const lastSegment = segments?.[segments.length - 1] || null;

  const renderTab = (item: (typeof TAB_MENUS)[number]) => {
    const { location, ...rest } = item;
    const locationSegment = location === '/' ? null : location.split('/').filter(Boolean)[0];
    const isActive = lastSegment === locationSegment;

    return (
      <Link
        key={location}
        href={location}
        scroll={true}
        className={cn(
          `relative flex flex-1 cursor-pointer flex-col items-center justify-center gap-1 py-3 text-center text-black no-underline ${
            isActive && 'rounded-md text-primary'
          }`,
        )}
      >
        <Image
          src={isActive ? rest.active : rest.inActive}
          alt={rest.alt}
          width={20}
          height={20}
          priority
          style={{ width: 'auto', height: 'auto' }}
        />
        <span className={cn(`text-[0.78rem] ${isActive ? 'text-primary' : 'text-gray-400'}`)}>{rest.menu}</span>
      </Link>
    );
  };

  const handleAddCrew = () => {
    if (!user) {
      overlay.open((overlayProps) => <LoginAlert {...overlayProps} />);
      return;
    }

    router.push(PATH.addCrew, { scroll: false });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 mx-auto flex min-w-[20rem] max-w-[45rem] items-center bg-white shadow-md">
      {renderTab(TAB_MENUS[0])}

      <button
        type="button"
        aria-label="크루 개설하기"
        onClick={handleAddCrew}
        className="flex flex-1 cursor-pointer flex-col items-center justify-center py-3 text-center"
      >
        <span className="relative text-primary">
          <Users size={28} strokeWidth={2} />
          <span className="absolute -right-1 -top-1 flex size-3.5 items-center justify-center rounded-full bg-primary text-white">
            <Plus size={10} strokeWidth={3} />
          </span>
        </span>
      </button>

      {renderTab(TAB_MENUS[1])}
    </div>
  );
};

export default BottomTab;
