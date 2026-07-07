'use client';

import { useEffect } from 'react';

import { consumeIntentionalBack, setNavDirection } from '../utils/navDirection';

export const useNavDirectionTracker = () => {
  useEffect(() => {
    const handlePopState = () => {
      // 네이티브(window) 제스처든 의도적 router.back()이든 'back' CSS 슬라이드로 실제 이전 페이지를 보여준다.
      // ('skip'(animation:none)은 WKWebView SPA 에서 빈 스냅샷=흰 화면만 남아 제거.)
      // (markIntentionalBack 플래그는 누수 방지로 소비만 하고, 방향은 항상 'back'.)
      consumeIntentionalBack();
      setNavDirection('back');
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);
};
