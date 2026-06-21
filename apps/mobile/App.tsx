/**
 * Onsquad 모바일 셸
 * apps/web 를 WebView 로 로드한다.
 * 웹이 'APP_READY' 신호를 보내면 네이티브 스플래시(BootSplash)를 숨긴다.
 *
 * @format
 */

import { useEffect, useRef } from 'react';
import { useColorScheme, StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { WebView, type WebViewMessageEvent } from 'react-native-webview';
import BootSplash from 'react-native-bootsplash';

// iOS·Android 모두 localhost 를 사용한다. (Android 는 `adb reverse tcp:3000 tcp:3000` 로 호스트에 매핑 — run-emulator 스킬)
// localhost 를 쓰는 이유: MSW Service Worker 가 보안 컨텍스트(localhost/https)에서만 등록되기 때문(10.0.2.2 비보안 → worker 실패 → 흰 화면).
// 배포 시 운영 웹 URL 로 교체한다.
const WEB_URL = 'http://localhost:3000';

// 스플래시 해제 안전망 (웹 신호가 끝내 안 오면 강제 해제)
const SPLASH_FALLBACK_MS = 6000;

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const hiddenRef = useRef(false);

  const hideSplash = () => {
    if (hiddenRef.current) return;
    hiddenRef.current = true;
    void BootSplash.hide({ fade: true });
  };

  useEffect(() => {
    const timer = setTimeout(hideSplash, SPLASH_FALLBACK_MS);
    return () => clearTimeout(timer);
  }, []);

  // 웹: window.ReactNativeWebView.postMessage('APP_READY')
  const onMessage = (event: WebViewMessageEvent) => {
    if (event.nativeEvent.data === 'APP_READY') {
      hideSplash();
    }
  };

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <WebView source={{ uri: WEB_URL }} style={styles.webview} onMessage={onMessage} onError={hideSplash} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default App;
