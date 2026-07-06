'use client';

import { useCallback } from 'react';

import { useTransitionRouter } from 'next-view-transitions';

import { markIntentionalBack, setNavDirection } from '../utils/navDirection';

export const usePageMove = () => {
  const router = useTransitionRouter();

  const handlePageMove = useCallback(
    (path: string, options?: { scroll: boolean }) => {
      setNavDirection('forward');
      router.push(path, { scroll: options?.scroll ?? false });
    },
    [router],
  );

  const handleReplace = useCallback(
    (path: string, options?: { scroll: boolean }) => {
      setNavDirection('forward');
      router.replace(path, { scroll: options?.scroll ?? false });
    },
    [router],
  );

  // 의도적 뒤로가기: 뷰트랜지션(슬라이드)을 유지한다. window(네이티브 제스처) 뒤로가기와 구분하기 위해
  // 플래그를 세팅한 뒤 popstate 를 유발한다. (핸들러가 소비해 'back' 애니메이션으로 처리)
  const handleBack = useCallback(() => {
    markIntentionalBack();
    router.back();
  }, [router]);

  return { handlePageMove, handleReplace, handleBack };
};
