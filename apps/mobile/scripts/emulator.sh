#!/usr/bin/env bash
#
# Android 에뮬레이터 부팅 스크립트
#
# 사용법:
#   ./scripts/emulator.sh [AVD_NAME]
#   pnpm --filter @onsquad/mobile emulator
#
# - AVD 미지정 시 첫 번째 AVD 사용.
# - 이미 실행 중이면 재사용.
# - 백그라운드로 띄우고(detach) 부팅 완료까지 대기 → 스크립트가 끝나도 에뮬레이터는 유지된다.
#   (자신의 터미널에서 실행해야 세션과 독립적으로 살아 있습니다.)
#
set -euo pipefail

ANDROID_HOME="${ANDROID_HOME:-${ANDROID_SDK_ROOT:-$HOME/Library/Android/sdk}}"
EMULATOR="$ANDROID_HOME/emulator/emulator"
ADB="$ANDROID_HOME/platform-tools/adb"

if [ ! -x "$EMULATOR" ]; then
  echo "emulator 실행 파일을 찾을 수 없습니다: $EMULATOR" >&2
  echo "ANDROID_HOME 을 확인하세요 (현재: $ANDROID_HOME)" >&2
  exit 1
fi

# 이미 떠 있으면 재사용
if "$ADB" devices | grep -q 'emulator-[0-9]*[[:space:]]*device'; then
  echo "이미 실행 중인 에뮬레이터를 사용합니다."
  "$ADB" devices
  exit 0
fi

AVD="${1:-$("$EMULATOR" -list-avds | head -1)}"
if [ -z "$AVD" ]; then
  echo "사용 가능한 AVD 가 없습니다. Android Studio 에서 AVD 를 먼저 생성하세요." >&2
  exit 1
fi

echo "부팅: $AVD"
nohup "$EMULATOR" -avd "$AVD" -gpu auto > "/tmp/onsquad-emulator-${AVD}.log" 2>&1 &
disown

echo "부팅 대기 중..."
"$ADB" wait-for-device
until [ "$("$ADB" shell getprop sys.boot_completed 2>/dev/null | tr -d '\r')" = "1" ]; do
  sleep 2
done

echo "부팅 완료:"
"$ADB" devices

# WebView 가 호스트 web dev(:3000)에 접근하도록 매핑.
# localhost(보안 컨텍스트) 사용 → MSW Service Worker 등록 가능. (run-emulator 스킬)
"$ADB" reverse tcp:3000 tcp:3000 || true
echo "adb reverse tcp:3000 tcp:3000 설정됨 (web dev 서버 필요: pnpm --filter web dev)"
