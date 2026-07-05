export type NavDirection = 'forward' | 'back';

/**
 * `data-vt-direction`은 해제되지 않고 마지막 값이 유지된다. next-view-transitions의
 * `Link`/`useTransitionRouter`로 트랜지션을 유발하는 모든 내비게이션은 호출 직전 반드시
 * setNavDirection(또는 resolveTabDirection 결과)로 방향을 태깅해야 한다. 태깅하지 않으면
 * 직전 방향값을 상속해 반대 방향으로 슬라이드할 수 있다.
 */
export const setNavDirection = (direction: NavDirection): void => {
  if (typeof document === 'undefined') {
    return;
  }

  document.documentElement.dataset.vtDirection = direction;
};

export const resolveTabDirection = (currentIndex: number, targetIndex: number): NavDirection | null => {
  if (currentIndex === targetIndex) {
    return null;
  }

  if (targetIndex > currentIndex) {
    return 'forward';
  }

  return 'back';
};
