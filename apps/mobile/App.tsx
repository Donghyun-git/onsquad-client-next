/**
 * Onsquad 모바일 셸
 * apps/web 를 WebView 로 로드한다.
 *
 * @format
 */

import { useColorScheme, StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

// iOS·Android 모두 localhost 를 사용한다. (Android 는 `adb reverse tcp:3000 tcp:3000` 로 호스트에 매핑 — run-emulator 스킬)
// localhost 를 쓰는 이유: MSW Service Worker 가 보안 컨텍스트(localhost/https)에서만 등록되기 때문(10.0.2.2 비보안 → worker 실패 → 흰 화면).
// 배포 시 운영 웹 URL 로 교체한다.
const WEB_URL = 'http://localhost:3000';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <WebView source={{ uri: WEB_URL }} style={styles.webview} />
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
