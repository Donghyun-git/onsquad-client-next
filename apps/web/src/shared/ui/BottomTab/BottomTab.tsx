'use client';

import { useSelectedLayoutSegments } from 'next/navigation';

import { type MouseEvent } from 'react';

import { Plus, Users } from 'lucide-react';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import { overlay } from 'overlay-kit';

import { PATH } from '@/shared/config/paths';
import { TAB_MENUS } from '@/shared/config/tabs';
import { usePageMove, useUser } from '@/shared/lib/hooks';
import { cn } from '@/shared/lib/utils';
import { resolveTabDirection, setNavDirection } from '@/shared/lib/utils/navDirection';
import { LoginAlert } from '@/shared/ui/LoginAlert';

const toTabSegment = (location: string) => (location === '/' ? null : location.split('/').filter(Boolean)[0]);

interface TabItemProps {
  item: (typeof TAB_MENUS)[number];
  index: number;
  currentTabIndex: number;
  lastSegment: string | null;
}

const TabItem = ({ item, index, currentTabIndex, lastSegment }: TabItemProps) => {
  const { location, active, inActive, alt, menu } = item;
  const isActive = lastSegment === toTabSegment(location);

  const handleTabClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const direction = resolveTabDirection(currentTabIndex, index);

    if (direction === null) {
      event.preventDefault();
      return;
    }

    setNavDirection(direction);
  };

  return (
    <Link
      href={location}
      scroll={true}
      onClick={handleTabClick}
      className={cn(
        `relative flex flex-1 cursor-pointer flex-col items-center justify-center gap-1 py-3 text-center text-black no-underline ${
          isActive && 'rounded-md text-primary'
        }`,
      )}
    >
      <Image
        src={isActive ? active : inActive}
        alt={alt}
        width={20}
        height={20}
        priority
        style={{ width: 'auto', height: 'auto' }}
      />
      <span className={cn(`text-[0.78rem] ${isActive ? 'text-primary' : 'text-gray-400'}`)}>{menu}</span>
    </Link>
  );
};

const BottomTab = () => {
  const segments = useSelectedLayoutSegments();
  const { handlePageMove } = usePageMove();

  const user = useUser();

  const lastSegment = segments?.[segments.length - 1] || null;

  const currentTabIndex = TAB_MENUS.findIndex((item) => lastSegment === toTabSegment(item.location));

  const handleAddCrew = () => {
    if (!user) {
      overlay.open((overlayProps) => <LoginAlert {...overlayProps} />);
      return;
    }

    handlePageMove(PATH.addCrew, { scroll: false });
  };

  return (
    <div
      style={{ viewTransitionName: 'app-bottom-tab' }}
      className="fixed bottom-0 left-0 right-0 z-10 mx-auto flex min-w-[20rem] max-w-[45rem] items-center bg-white pb-[env(safe-area-inset-bottom)] shadow-md"
    >
      <TabItem item={TAB_MENUS[0]} index={0} currentTabIndex={currentTabIndex} lastSegment={lastSegment} />

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

      <TabItem item={TAB_MENUS[1]} index={1} currentTabIndex={currentTabIndex} lastSegment={lastSegment} />
    </div>
  );
};

export default BottomTab;
