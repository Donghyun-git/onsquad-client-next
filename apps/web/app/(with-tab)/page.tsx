export { HomePage as default } from '@/pages/home';

// 메인페이지는 ISR: 서버는 비인증(공개) 크루 리스트를 prefetch 해 캐시하고,
// 로그인 사용자는 클라이언트에서 권한 포함 리스트로 교체한다(개인화 오버레이).
// 서버 컴포넌트가 auth() 를 호출하지 않으므로 ISR 이 유지된다.
export const revalidate = 3600;
