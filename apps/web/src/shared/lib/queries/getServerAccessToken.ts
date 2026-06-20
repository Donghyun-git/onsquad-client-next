import { auth } from '@/auth';

/**
 * 서버 컴포넌트에서 인증 prefetch 에 사용할 accessToken 을 한 곳에서 해석한다.
 *
 * - `auth()` 호출이 이 한 레이어로 모인다.
 * - 단, 이 함수를 호출(=쿠키 읽기)하는 페이지는 그 순간 **동적(SSR) 렌더**가 된다.
 *   정적(SSG/ISR)을 유지하려는 페이지는 서버에서 인증 데이터를 prefetch 하지 말고
 *   클라이언트(useQuery)에서 가져온다.
 *
 * 서버 전용 — 클라이언트 번들 오염을 피하기 위해 배럴(index)에서 re-export 하지 않는다.
 */
export async function getServerAccessToken(): Promise<string | undefined> {
  console.log('[DIAG getServerAccessToken] RSC 에서 auth() 호출');

  const session = await auth();

  return session?.accessToken;
}
