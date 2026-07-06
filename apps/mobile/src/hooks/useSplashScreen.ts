import { useEffect, useRef } from 'react';

import BootSplash from 'react-native-bootsplash';

// 웹 신호(APP_READY)가 끝내 안 오면 강제 해제하는 안전망.
const SPLASH_FALLBACK_MS = 6000;

/**
 * 네이티브 스플래시(BootSplash) 해제를 관리한다.
 * - hideSplash: 여러 번 호출해도 1회만 해제한다(idempotent).
 * - 웹의 'APP_READY' 메시지, WebView onError, 또는 안전망 타임아웃으로 해제된다.
 */
export const useSplashScreen = () => {
  const hiddenRef = useRef(false);

  const hideSplash = () => {
    if (hiddenRef.current) {
      return;
    }

    hiddenRef.current = true;
    void BootSplash.hide({ fade: true });
  };

  useEffect(() => {
    const timer = setTimeout(hideSplash, SPLASH_FALLBACK_MS);

    return () => clearTimeout(timer);
  }, []);

  const handleMessage = (data: string) => {
    if (data === 'APP_READY') {
      hideSplash();
    }
  };

  return { hideSplash, handleMessage };
};
