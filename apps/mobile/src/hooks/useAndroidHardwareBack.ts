import { useEffect, useRef, type ComponentRef, type RefObject } from 'react';

import { BackHandler } from 'react-native';
import { WebView, type WebViewNavigation } from 'react-native-webview';

/**
 * Android 하드웨어 백 버튼을 WebView 뒤로가기로 연결한다.
 * - web history 가 남아있으면 WebView 를 뒤로 보내고 이벤트를 소비(true)한다.
 * - 없으면 기본 동작(앱 종료)에 맡긴다(false).
 * - iOS 에서는 발생하지 않는 이벤트다.
 *
 * onNavigationStateChange 를 WebView 에 연결해 web history 깊이(canGoBack)를 추적한다.
 */
export const useAndroidHardwareBack = (webRef: RefObject<ComponentRef<typeof WebView> | null>) => {
  const canGoBackRef = useRef(false);

  useEffect(() => {
    const onHardwareBack = () => {
      if (canGoBackRef.current) {
        webRef.current?.goBack();

        return true;
      }

      return false;
    };

    const sub = BackHandler.addEventListener('hardwareBackPress', onHardwareBack);

    return () => sub.remove();
  }, [webRef]);

  const onNavigationStateChange = (navState: WebViewNavigation) => {
    canGoBackRef.current = navState.canGoBack;
  };

  return { onNavigationStateChange };
};
