'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    ReactNativeWebView?: { postMessage: (message: string) => void };
  }
}

/**
 * RN WebView 셸에 "웹 준비 완료"를 알린다.
 * 마운트(=하이드레이션 완료) 시점에 신호 → 네이티브 스플래시(BootSplash) 해제.
 * 일반 브라우저에서는 ReactNativeWebView 가 없어 no-op.
 */
export function WebViewBridge() {
  useEffect(() => {
    window.ReactNativeWebView?.postMessage('APP_READY');
  }, []);

  return null;
}
