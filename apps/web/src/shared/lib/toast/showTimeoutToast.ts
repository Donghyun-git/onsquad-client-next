'use client';

import { TOAST } from '@/shared/config/toast';
import { toast } from '@/shared/ui/ui/use-toast';

const TIMEOUT_TOAST_DURATION = 1500;

/**
 * 요청 타임아웃 등 일시적 오류 시 재시도 안내 토스트.
 * 컴포넌트 밖(api client)에서도 호출할 수 있도록 imperative toast 를 사용한다.
 */
export const showTimeoutToast = () => {
  const { dismiss } = toast({
    title: '잠시 후 다시 시도해 주세요.',
    className: TOAST.warn,
  });

  setTimeout(() => dismiss(), TIMEOUT_TOAST_DURATION);
};
