# @onsquad/mobile

RN CLI(bare) WebView 셸. `apps/web`(Next.js)를 WebView 로 로드한다.

- **RN**: 0.86.0 / React 19 / New Architecture (default)
- **WebView**: `react-native-webview`
- **현재 대상**: Android (로컬에 Xcode 부재 → iOS 빌드 보류)

---

## 전제 (모노레포)

- pnpm `node-linker=hoisted` → RN 네이티브 패키지는 **루트 `node_modules`** 에 호이스팅됨.
- 따라서 gradle 경로는 앱 로컬이 아닌 루트를 가리킨다 (패치 완료):
  - `android/settings.gradle` → `../../../node_modules/@react-native/gradle-plugin`
  - `android/app/build.gradle` `react { }` → `reactNativeDir`/`codegenDir`/`cliFile` 를 `../../../../node_modules/...` 로 보정.
- `metro.config.js` 는 모노레포 루트를 `watchFolders` 로, 루트 `node_modules` 를 `nodeModulesPaths` 로 추가한다.

## 로컬 요구사항

| 항목 | 값 |
| --- | --- |
| Node | **24.12.0** (루트 `.nvmrc`) — `nvm use` |
| JDK | Android Studio 번들 **JBR(21)** 재사용 → 별도 설치 불필요 |
| Android SDK | `ANDROID_HOME` 설정 필요 (adb/SDK) |

JDK 는 시스템에 별도 설치하지 않고 JBR 을 가리킨다(머신 경로라 커밋하지 않음):

```bash
export JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home"
```

## 실행

```bash
# 0) Node 통일
nvm use            # 24.12.0

# 1) 웹 dev 서버 (셸이 로드할 대상)
pnpm --filter web dev          # http://localhost:3000

# 2) Android 에뮬레이터 부팅 (자신의 터미널에서 — 세션과 독립 유지)
#    AVD 자동 선택, 부팅 완료까지 대기. 인자로 AVD 지정 가능: ... emulator ksl_pixel
pnpm --filter @onsquad/mobile emulator

# 3) Metro 번들러
pnpm --filter @onsquad/mobile start

# 4) Android 빌드·설치·실행 (JAVA_HOME=JBR)
pnpm --filter @onsquad/mobile android
```

- 앱은 iOS·Android 모두 `http://localhost:3000` 을 로드한다. Android 는 `adb reverse tcp:3000 tcp:3000` 로 호스트에 매핑(위 `emulator` 스크립트가 자동 설정). `localhost` 사용 이유: MSW Service Worker 가 보안 컨텍스트에서만 등록되기 때문. 자세한 절차는 `/run-emulator` 스킬 참조.
- 배포 시 `App.tsx` 의 `WEB_URL` 을 운영 웹 URL 로 교체한다.
