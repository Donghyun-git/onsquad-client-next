/**
 * Onsquad 모바일 셸
 * apps/web 를 WebView 로 로드한다.
 * 웹이 'APP_READY' 신호를 보내면 네이티브 스플래시(BootSplash)를 숨긴다.
 *
 * @format
 */

import { useEffect, useRef, type ComponentRef } from 'react';
import {
  useColorScheme,
  StatusBar,
  StyleSheet,
  BackHandler,
  View,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  WebView,
  type WebViewMessageEvent,
  type WebViewNavigation,
} from 'react-native-webview';
import BootSplash from 'react-native-bootsplash';

// iOS·Android 모두 localhost 를 사용한다. (Android 는 `adb reverse tcp:3000 tcp:3000` 로 호스트에 매핑 — run-emulator 스킬)
// localhost 를 쓰는 이유: MSW Service Worker 가 보안 컨텍스트(localhost/https)에서만 등록되기 때문(10.0.2.2 비보안 → worker 실패 → 흰 화면).
// 배포 시 운영 웹 URL 로 교체한다.
const WEB_URL = 'http://onsquad-client-next.vercel.app/';

// 스플래시 해제 안전망 (웹 신호가 끝내 안 오면 강제 해제)
const SPLASH_FALLBACK_MS = 6000;

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const hiddenRef = useRef(false);
  const webRef = useRef<ComponentRef<typeof WebView>>(null);
  // WebView 의 브라우저 history 에 뒤로 갈 페이지가 있는지 추적한다.
  const canGoBackRef = useRef(false);

  const hideSplash = () => {
    if (hiddenRef.current) return;
    hiddenRef.current = true;
    void BootSplash.hide({ fade: true });
  };

  useEffect(() => {
    const timer = setTimeout(hideSplash, SPLASH_FALLBACK_MS);
    return () => clearTimeout(timer);
  }, []);

  // Android 하드웨어 백 버튼: web history 가 남아있으면 WebView 를 뒤로,
  // 없으면 기본 동작(앱 종료)에 맡긴다. (iOS 에서는 발생하지 않는 이벤트)
  useEffect(() => {
    const onHardwareBack = () => {
      if (canGoBackRef.current) {
        webRef.current?.goBack();
        return true;
      }
      return false;
    };
    const sub = BackHandler.addEventListener(
      'hardwareBackPress',
      onHardwareBack,
    );
    return () => sub.remove();
  }, []);

  // 웹: window.ReactNativeWebView.postMessage('APP_READY')
  const onMessage = (event: WebViewMessageEvent) => {
    if (event.nativeEvent.data === 'APP_READY') {
      hideSplash();
    }
  };

  const onNavigationStateChange = (navState: WebViewNavigation) => {
    canGoBackRef.current = navState.canGoBack;
  };

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {/* 엣지투엣지: WebView 가 화면 전체(상태바·홈인디케이터 영역 포함)를 채우고,
          웹이 env(safe-area-inset-*) 로 헤더/탭 배경을 그 영역까지 확장한다(콘텐츠는 그대로). */}
      <View style={styles.container}>
        <WebView
          ref={webRef}
          source={{ uri: WEB_URL }}
          style={styles.webview}
          onMessage={onMessage}
          onError={hideSplash}
          onNavigationStateChange={onNavigationStateChange}
          // iOS: 자동 콘텐츠 인셋 비활성화 → 웹이 safe-area 를 직접 처리(env(safe-area-inset-*))
          contentInsetAdjustmentBehavior="never"
          // iOS: 엣지 스와이프로 web history 뒤로가기 (native 슬라이드 트랜지션)
          allowsBackForwardNavigationGestures
        />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // 로딩/오버스크롤 시 검정 대신 앱 배경(흰색)이 보이도록
    backgroundColor: '#ffffff',
  },
  webview: {
    flex: 1,
  },
});

export default App;
