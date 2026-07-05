'use client';

import { useRouter } from 'next/navigation';

import { ChevronLeft } from 'lucide-react';

import { cn } from '@/shared/lib/utils';

export interface AppbarPropsType {
  title?: string;
}

const Appbar = ({ title }: AppbarPropsType) => {
  const router = useRouter();

  return (
    <div
      style={{ viewTransitionName: 'app-header' }}
      className={cn(
        'fixed left-1/2 top-0 z-[100] flex w-full min-w-[20rem] max-w-[45rem] -translate-x-1/2 transform items-center justify-between bg-white shadow-md-bottom',
      )}
    >
      <div className="ml-4 flex h-14 w-20 cursor-pointer items-center" onClick={() => router.back()}>
        <ChevronLeft color="#636363" strokeWidth={1.25} />
      </div>
      <h3 className="font-bold">{title}</h3>
      <div className="mr-4 w-20"></div>
    </div>
  );
};

export default Appbar;
