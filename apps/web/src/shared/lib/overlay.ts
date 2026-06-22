import { OVERLAY_ANIMATION_DURATION } from '@/shared/config';

/** 오버레이를 닫고 닫힘 애니메이션 시간만큼 뒤 unmount 한다. */
export const closeWithAnimation = (close?: () => void, unmount?: () => void) => {
  close?.();
  setTimeout(() => unmount?.(), OVERLAY_ANIMATION_DURATION);
};
