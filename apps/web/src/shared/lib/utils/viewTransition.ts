/**
 * next-view-transitions는 브라우저 raw `document.startViewTransition`을 직접 호출하고
 * popstate 경로에서 `.ready`/`.finished`에 catch를 달지 않는다. 트랜지션이 스킵되면
 * (탭 hidden 등 양성 케이스 포함) `InvalidStateError`가 unhandledRejection으로 샌다.
 * React #34098(PR #34450)의 react-dom 보호도 라이브러리의 raw 호출에는 적용되지 않으므로,
 * 뷰 트랜지션발 InvalidStateError만 식별해 삼키기 위한 판별자다.
 */
export const isViewTransitionAbort = (reason: unknown): boolean => {
  if (reason === null || typeof reason !== 'object') {
    return false;
  }

  const { name, message } = reason as { name?: unknown; message?: unknown };

  if (name !== 'InvalidStateError') {
    return false;
  }

  return typeof message === 'string' && /transition/i.test(message);
};
