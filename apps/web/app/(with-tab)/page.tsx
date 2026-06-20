export { HomePage as default } from '@/pages/home';

// 서버사이드 crew fetch 페이지: 빌드타임 prerender 를 건너뛰고 요청 시 렌더한다.
// (백엔드가 떠 있지 않아도 next build 가 통과한다.)
export const dynamic = 'force-dynamic';
