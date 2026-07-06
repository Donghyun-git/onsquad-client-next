'use client';

import { useEffect } from 'react';

/**
 * 현재 화면이 네이티브(iOS 엣지 스와이프) 뒤로가기를 허용하는지 RN WebView 셸에 알린다.
 * 당근처럼 back 버튼 헤더(Appbar)가 있는 화면만 on, 루트/탭(GlobalHeader)은 off 로 보낸다.
 * 목적지 페이지의 헤더가 mount 될 때 상태를 확정하므로 전환 중 unmount 순서에 영향받지 않는다.
 * 일반 브라우저에선 ReactNativeWebView 가 없어 no-op.
 */
export const useNativeBackGesture = (enabled: boolean) => {
  useEffect(() => {
    window.ReactNativeWebView?.postMessage(enabled ? 'NATIVE_BACK:on' : 'NATIVE_BACK:off');
  }, [enabled]);
};
