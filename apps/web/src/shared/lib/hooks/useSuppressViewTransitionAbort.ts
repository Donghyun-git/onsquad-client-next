'use client';

import { useEffect } from 'react';

import { isViewTransitionAbort } from '../utils/viewTransition';

/**
 * next-view-transitions의 popstate 트랜지션은 스킵/abort 시 catch 없이
 * unhandledRejection을 던진다. 뷰 트랜지션발 InvalidStateError만 골라 삼켜
 * 콘솔 노이즈를 막는다. (근본 원인인 중복 view-transition-name은 별도 제거)
 */
export const useSuppressViewTransitionAbort = () => {
  useEffect(() => {
    const handleRejection = (event: PromiseRejectionEvent) => {
      if (isViewTransitionAbort(event.reason)) {
        event.preventDefault();
      }
    };

    window.addEventListener('unhandledrejection', handleRejection);

    return () => {
      window.removeEventListener('unhandledrejection', handleRejection);
    };
  }, []);
};
