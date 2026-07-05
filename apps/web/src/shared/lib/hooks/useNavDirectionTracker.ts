'use client';

import { useEffect } from 'react';

import { setNavDirection } from '../utils/navDirection';

export const useNavDirectionTracker = () => {
  useEffect(() => {
    const handlePopState = () => {
      setNavDirection('back');
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);
};
