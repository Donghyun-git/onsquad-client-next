# apps/mobile (placeholder)

RN CLI bare 앱은 추후 설치 예정. WebView 셸로 `apps/web` 를 로드한다.

- 전제: 루트 `.npmrc` 의 `node-linker=hoisted`
- RN 네이티브 패키지는 루트 `node_modules` 에 호이스팅됨 → gradle 경로(`settings.gradle`, `app/build.gradle`)는 앱 로컬이 아닌 **루트** `node_modules` 를 가리켜야 함 (`.claude/CLAUDE.md` 규칙 4 참조).
- 실행: 설치 후 `/run-emulator` skill 흐름 사용.
