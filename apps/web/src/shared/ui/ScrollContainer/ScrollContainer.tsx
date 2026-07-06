'use client';

import { createContext, useContext, useRef, type ReactNode, type RefObject } from 'react';

import { useScrollRestoration } from '@/shared/lib/hooks';
import { cn } from '@/shared/lib/utils';

const ScrollContainerContext = createContext<RefObject<HTMLDivElement | null> | null>(null);

/** 스크롤 컨테이너 엘리먼트 ref. Pull-to-Refresh 등 스크롤 제스처 훅이 참조한다. */
export const useScrollContainerRef = () => useContext(ScrollContainerContext);

interface ScrollContainerProps {
  className?: string;
  children: ReactNode;
}

/**
 * 앱의 내부 스크롤 영역(fixed overflow-y-auto). 스크롤 복원을 담당하고,
 * 자신의 ref 를 context 로 노출해 하위(페이지)에서 스크롤 제스처(PTR 등)를 붙일 수 있게 한다.
 */
export const ScrollContainer = ({ className, children }: ScrollContainerProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useScrollRestoration(ref);

  return (
    <ScrollContainerContext.Provider value={ref}>
      {/* overscroll-y-contain: iOS 네이티브 바운스가 Pull-to-Refresh 제스처를 삼키지 않게 한다. */}
      <div ref={ref} className={cn('overscroll-y-contain', className)}>
        {children}
      </div>
    </ScrollContainerContext.Provider>
  );
};
