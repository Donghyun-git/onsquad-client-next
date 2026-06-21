'use client';

import { useSelectedLayoutSegments } from 'next/navigation';

import Image from 'next/image';
import Link from 'next/link';
import { overlay } from 'overlay-kit';

import { LoginAlert } from '@/widgets/LoginAlert';

import { PATH } from '@/shared/config/paths';
import { TAB_MENUS } from '@/shared/config/tabs';
import { useUser } from '@/shared/lib/hooks';
import { cn } from '@/shared/lib/utils';

const BottomTab = () => {
  const segments = useSelectedLayoutSegments();

  const user = useUser();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 mx-auto flex min-w-[20rem] max-w-[45rem] bg-white shadow-md">
      {TAB_MENUS.map((item) => {
        const { location, ...rest } = item;

        const lastSegment = segments?.[segments.length - 1] || null;
        const locationSegment = location === '/' ? null : location.split('/').filter(Boolean)[0];
        const isActive = lastSegment === locationSegment;

        if (!user && location === '/crews') {
          return (
            <div
              key={item.location}
              className={cn(
                `relative flex w-[33%] flex-grow cursor-pointer flex-col items-center justify-center gap-1 py-3 text-center text-black no-underline ${
                  isActive && 'rounded-md bg-primary text-primary'
                }`,
              )}
              onClick={() =>
                !user && location === PATH.crews
                  ? overlay.open((overlayProps) => <LoginAlert {...overlayProps} />)
                  : null
              }
            >
              <Image
                src={isActive ? rest.active : rest.inActive}
                alt={rest.alt}
                width={20}
                height={20}
                priority
                style={{ width: 'auto', height: 'auto' }}
              />

              <span className={cn(`text-[0.78rem] ${isActive ? 'bg-primary text-primary' : 'text-gray-400'}`)}>
                {rest.menu}
              </span>
            </div>
          );
        } else {
          return (
            <Link
              key={item.location}
              href={item.location}
              scroll={true}
              className={cn(
                `relative flex w-[33%] flex-grow cursor-pointer flex-col items-center justify-center gap-1 py-3 text-center text-black no-underline ${
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
        }
      })}
    </div>
  );
};

export default BottomTab;
