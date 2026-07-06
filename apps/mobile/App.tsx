/**
 * Onsquad 모바일 셸
 * apps/web 를 WebView 로 로드한다.
 * 웹이 'APP_READY' 신호를 보내면 네이티브 스플래시(BootSplash)를 숨긴다.
 *
 * @format
 */

import { useRef, type ComponentRef } from 'react';
import { useColorScheme, StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { WebView, type WebViewMessageEvent } from 'react-native-webview';

import { useAndroidHardwareBack } from './src/hooks/useAndroidHardwareBack';
import { useBackGesture } from './src/hooks/useBackGesture';
import { useSplashScreen } from './src/hooks/useSplashScreen';

// iOS·Android 모두 localhost 를 사용한다. (Android 는 `adb reverse tcp:3000 tcp:3000` 로 호스트에 매핑 — run-emulator 스킬)
// localhost 를 쓰는 이유: MSW Service Worker 가 보안 컨텍스트(localhost/https)에서만 등록되기 때문(10.0.2.2 비보안 → worker 실패 → 흰 화면).
// 배포 시 운영 웹 URL 로 교체한다.
const WEB_URL = 'http://onsquad-client-next.vercel.app/';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const webRef = useRef<ComponentRef<typeof WebView>>(null);

  const { hideSplash, handleMessage: handleSplashMessage } = useSplashScreen();
  const { backGestureEnabled, handleMessage: handleBackGestureMessage } = useBackGesture();
  const { onNavigationStateChange } = useAndroidHardwareBack(webRef);

  // 웹→네이티브 메시지를 각 관심사 훅으로 라우팅한다.
  const onMessage = (event: WebViewMessageEvent) => {
    const data = event.nativeEvent.data;

    handleSplashMessage(data);
    handleBackGestureMessage(data);
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
          // iOS: back 버튼 헤더 화면에서만 엣지 스와이프 뒤로가기 허용(웹 신호로 토글)
          allowsBackForwardNavigationGestures={backGestureEnabled}
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
