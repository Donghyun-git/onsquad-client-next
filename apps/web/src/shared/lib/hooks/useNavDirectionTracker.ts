'use client';

import { useEffect } from 'react';

import { consumeIntentionalBack, setNavDirection } from '../utils/navDirection';

export const useNavDirectionTracker = () => {
  useEffect(() => {
    const handlePopState = () => {
      // 의도적 router.back()(handleBack)이면 'back' 슬라이드, 그 외 window(네이티브 제스처) 뒤로가기는
      // 네이티브 슬라이드와 겹쳐 깜빡이므로 CSS 트랜지션을 'skip'(즉시)으로 처리한다.
      setNavDirection(consumeIntentionalBack() ? 'back' : 'skip');
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);
};
