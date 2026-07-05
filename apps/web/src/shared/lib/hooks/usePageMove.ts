'use client';

import { useCallback } from 'react';

import { useTransitionRouter } from 'next-view-transitions';

import { setNavDirection } from '../utils/navDirection';

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

  return { handlePageMove, handleReplace };
};
