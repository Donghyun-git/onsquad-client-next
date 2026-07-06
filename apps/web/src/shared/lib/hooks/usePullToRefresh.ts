'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';

const THRESHOLD = 70; // 새로고침 발동 임계 당김 거리(px)
const MAX_PULL = 110; // 최대 당김 거리
const RESISTANCE = 0.5; // 당김 저항(실제 이동 대비 표시 비율)
const REFRESH_HOLD = 44; // 새로고침 중 스피너를 붙잡아둘 높이(px)

interface PullState {
  startY: number;
  pulling: boolean;
  pull: number;
  refreshing: boolean;
}

/**
 * 내부 스크롤 컨테이너 top 오버스크롤(아래로 당김)로 새로고침을 발동한다.
 * - scrollTop === 0 에서 아래로 당길 때만 활성(엣지 스와이프=가로와 무충돌).
 * - 임계치 초과 후 release → onRefresh 실행, 완료까지 스피너 유지.
 * 리스너는 ref 로 상태를 읽어 [scrollRef, onRefresh] 에만 의존한다(매 프레임 재구독 방지).
 */
export const usePullToRefresh = (
  scrollRef: RefObject<HTMLElement | null> | null | undefined,
  onRefresh: () => Promise<unknown> | void,
) => {
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const stateRef = useRef<PullState>({ startY: 0, pulling: false, pull: 0, refreshing: false });

  useEffect(() => {
    const el = scrollRef?.current;

    if (!el) {
      return;
    }

    const state = stateRef.current;

    const setPull = (value: number) => {
      state.pull = value;
      setPullDistance(value);
    };

    const onTouchStart = (event: TouchEvent) => {
      if (state.refreshing || el.scrollTop > 0) {
        return;
      }

      state.startY = event.touches[0].clientY;
      state.pulling = true;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (!state.pulling) {
        return;
      }

      if (el.scrollTop > 0) {
        state.pulling = false;
        setPull(0);

        return;
      }

      const delta = event.touches[0].clientY - state.startY;

      if (delta <= 0) {
        setPull(0);

        return;
      }

      // 당기는 동안 네이티브 스크롤/바운스를 막는다(non-passive).
      event.preventDefault();
      setPull(Math.min(delta * RESISTANCE, MAX_PULL));
    };

    const onTouchEnd = () => {
      if (!state.pulling) {
        return;
      }

      state.pulling = false;

      if (state.pull < THRESHOLD) {
        setPull(0);

        return;
      }

      state.refreshing = true;
      setIsRefreshing(true);
      setPull(REFRESH_HOLD);

      Promise.resolve(onRefresh()).finally(() => {
        state.refreshing = false;
        setIsRefreshing(false);
        setPull(0);
      });
    };

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('touchend', onTouchEnd);
    el.addEventListener('touchcancel', onTouchEnd);

    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
      el.removeEventListener('touchcancel', onTouchEnd);
    };
  }, [scrollRef, onRefresh]);

  return { pullDistance, isRefreshing, threshold: THRESHOLD };
};
