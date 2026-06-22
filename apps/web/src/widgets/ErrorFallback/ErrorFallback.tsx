'use client';

import { useRouter } from 'next/navigation';

import { useEffect, useRef } from 'react';

import { overlay } from 'overlay-kit';

import { PATH } from '@/shared/config/paths';
import { handleTokenExpiration, isTokenExpiredError } from '@/shared/lib/auth/handleTokenExpiration';
import { closeWithAnimation } from '@/shared/lib/overlay';
import { cn } from '@/shared/lib/utils';
import { Alert } from '@/shared/ui/Alert';
import { BUTTON } from '@/shared/ui/Alert/style';
import { Button } from '@/shared/ui/ui/button';
import type { FallbackProps } from '@/shared/types/error';

const DEFAULT_MESSAGE = '일시적인 오류가 발생했어요. 잠시 후 다시 시도해 주세요.';

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const router = useRouter();
  // StrictMode 이중 호출/리렌더에도 alert 를 한 번만 연다.
  const hasOpenedRef = useRef(false);

  const isTokenExpired = isTokenExpiredError(error);

  // 토큰 만료 시 alert 를 띄우지 않고 자동 로그아웃 후 로그인 페이지로 이동한다.
  useEffect(() => {
    if (isTokenExpired) {
      void handleTokenExpiration();
    }
  }, [isTokenExpired]);

  useEffect(() => {
    if (isTokenExpired) return;
    if (hasOpenedRef.current) return;
    hasOpenedRef.current = true;

    const message = error?.message?.trim() ? error.message : DEFAULT_MESSAGE;

    overlay.open(({ isOpen, close, unmount }) => {
      const dismiss = () => closeWithAnimation(close, unmount);

      // 다시 시도: ErrorBoundary 초기화 → Suspense 가 자식을 재마운트하며 쿼리를 재실행한다.
      const handleRetry = () => {
        dismiss();
        resetErrorBoundary();
      };

      // 홈으로: 같은 에러로 갇히지 않도록 빠져나갈 경로 제공.
      const handleGoHome = () => {
        dismiss();
        resetErrorBoundary();
        router.push(PATH.root);
      };

      return (
        <Alert
          isOpen={isOpen}
          title="알림"
          headerClassName="pt-6"
          buttonSlot={
            <div className="grid w-full grid-cols-2">
              <Button className={cn(BUTTON.CANCEL)} onClick={handleGoHome}>
                홈으로
              </Button>
              <Button className={cn(BUTTON.ACTION)} onClick={handleRetry}>
                다시 시도
              </Button>
            </div>
          }
        >
          {message}
        </Alert>
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTokenExpired]);

  return null;
}
