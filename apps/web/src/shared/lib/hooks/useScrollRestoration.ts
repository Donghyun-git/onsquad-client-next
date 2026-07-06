'use client';

import { useEffect, useLayoutEffect, type RefObject } from 'react';

import { usePathname } from 'next/navigation';

// 내부 스크롤 컨테이너의 위치를 라우트별로 인메모리 보관한다.
// 세션 내 이동(리스트→상세→back)만 대상이라 하드 새로고침 시 소실은 자연스럽다.
const scrollPositions = new Map<string, number>();

// 뒤로가기 여부: 코드 back('back') + 네이티브/window 뒤로가기('skip') 모두 복원 대상.
// forward(새 진입)는 top 유지.
const isBackNavigation = () => {
  const direction = document.documentElement.dataset.vtDirection;

  return direction === 'back' || direction === 'skip';
};

/**
 * 내부 스크롤 컨테이너(overflow-y-auto)의 스크롤 위치를 라우트별로 저장/복원한다.
 * - 저장: 스크롤 시(rAF throttle) + 언마운트 시
 * - 복원: 뒤로가기(back/skip)로 돌아왔을 때만. 콘텐츠 지연 렌더(무한스크롤 등) 대비 ResizeObserver 재시도.
 */
export const useScrollRestoration = (ref: RefObject<HTMLElement | null>) => {
  const pathname = usePathname() ?? '';

  useLayoutEffect(() => {
    const el = ref.current;

    if (!el || !isBackNavigation()) {
      return;
    }

    const saved = scrollPositions.get(pathname);

    if (saved == null || saved === 0) {
      return;
    }

    // 콘텐츠가 비동기(React Query/서스펜스)로 채워지며 scrollHeight 가 뒤늦게 커진다.
    // 컨테이너 크기는 고정이라 ResizeObserver 로는 감지되지 않으므로, 목표에 도달할 때까지
    // 프레임마다 재시도하고 최대 2초 후 멈춘다.
    let raf = 0;
    const start = performance.now();

    const attempt = () => {
      el.scrollTop = saved;

      const reached = Math.abs(el.scrollTop - saved) < 2;

      if (reached || performance.now() - start > 2000) {
        return;
      }

      raf = requestAnimationFrame(attempt);
    };

    attempt();

    return () => cancelAnimationFrame(raf);
  }, [pathname, ref]);

  useEffect(() => {
    const el = ref.current;

    if (!el) {
      return;
    }

    let raf = 0;
    const save = () => scrollPositions.set(pathname, el.scrollTop);
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(save);
    };

    el.addEventListener('scroll', onScroll, { passive: true });

    // 언마운트 시엔 저장하지 않는다: 네비게이션 머신이 나가는 컨테이너의 scrollTop 을 0 으로
    // 리셋한 뒤 언마운트되므로, 여기서 저장하면 사용자의 실제 위치가 0 으로 덮인다.
    // 마지막 실제 스크롤은 onScroll(rAF)이 이미 저장했고, 대기 중인 리셋 저장은 취소한다.
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('scroll', onScroll);
    };
  }, [pathname, ref]);
};
