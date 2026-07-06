// 'skip' = 뷰트랜지션 없이 즉시 전환. window(네이티브 제스처) 뒤로가기에서 네이티브 슬라이드와
// CSS 슬라이드가 겹쳐 깜빡이는 걸 막기 위해, 의도적 router.back() 이 아닌 popstate 는 skip 으로 태깅한다.
export type NavDirection = 'forward' | 'back' | 'skip';

// 의도적 뒤로가기(코드에서 router.back() 호출) 플래그. popstate 직전에 세팅하고, 핸들러가 1회 소비한다.
// 세팅되어 있으면 'back'(슬라이드 애니메이션), 없으면 window 뒤로가기로 보고 'skip'(즉시).
let intentionalBack = false;

export const markIntentionalBack = (): void => {
  intentionalBack = true;
};

export const consumeIntentionalBack = (): boolean => {
  if (intentionalBack) {
    intentionalBack = false;

    return true;
  }

  return false;
};

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
