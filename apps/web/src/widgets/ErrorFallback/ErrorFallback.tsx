'use client';

import { useRouter } from 'next/navigation';

import { useEffect, useRef } from 'react';

import { overlay } from 'overlay-kit';

import { PATH } from '@/shared/config/paths';
import { isTokenExpiredError } from '@/shared/lib/auth/isTokenExpiredError';
import { closeWithAnimation } from '@/shared/lib/overlay';
import { cn } from '@/shared/lib/utils';
import type { FallbackProps } from '@/shared/types/error';
import { Alert } from '@/shared/ui/Alert';
import { BUTTON } from '@/shared/ui/Alert/style';
import { Button } from '@/shared/ui/ui/button';

const DEFAULT_MESSAGE = '일시적인 오류가 발생했어요. 잠시 후 다시 시도해 주세요.';

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const router = useRouter();
  // StrictMode 이중 호출/리렌더에도 alert 를 한 번만 연다.
  const hasOpenedRef = useRef(false);

  // 토큰 만료 로그아웃은 QueryClient 의 QueryCache.onError(get-query-client)에서 중앙 처리한다.
  // 여기서는 만료 에러일 때 일반 에러 alert 를 띄우지 않도록 게이트로만 사용한다.
  const isTokenExpired = isTokenExpiredError(error);

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
  }, [isTokenExpired]);

  return null;
}
