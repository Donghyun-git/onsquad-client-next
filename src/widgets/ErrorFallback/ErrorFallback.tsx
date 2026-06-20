'use client';

import { useRouter } from 'next/navigation';

import { useEffect, useRef } from 'react';

import { overlay } from 'overlay-kit';
import { FallbackProps } from 'react-error-boundary';

import { ResponseModel } from '@/shared/api/model';
import { cn } from '@/shared/lib/utils';
import { Alert } from '@/shared/ui/Alert';
import { BUTTON } from '@/shared/ui/Alert/style';
import { Button } from '@/shared/ui/ui/button';

// 싱글톤 인스턴스를 추적하기 위한 전역 변수
let isErrorFallbackMounted = false;

interface ErrorFallbackProps extends FallbackProps {}

export function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  const router = useRouter();
  const hasHandledRef = useRef(false);
  const isNavigatingRef = useRef(false);

  // 이미 마운트된 인스턴스가 있으면 null 반환
  useEffect(() => {
    if (isErrorFallbackMounted) {
      return;
    }

    isErrorFallbackMounted = true;

    return () => {
      isErrorFallbackMounted = false;
    };
  }, []);

  // 이미 마운트된 인스턴스가 있으면 아무것도 렌더링하지 않음
  if (isErrorFallbackMounted && !hasHandledRef.current) {
    return null;
  }

  const handleNavigation = () => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;

    resetErrorBoundary();

    router.back();

    setTimeout(() => {
      location.reload();
    }, 0);
  };

  useEffect(() => {
    overlay.open((overlayProps) => (
      <Alert
        {...overlayProps}
        title="알림"
        headerClassName="pt-6"
        buttonSlot={
          <div className="w-full">
            <Button
              className={cn(BUTTON.ACTION, 'w-full rounded-bl-md')}
              onClick={handleNavigation}
              disabled={isNavigatingRef.current}
            >
              확인
            </Button>
          </div>
        }
      >
        {(error as Required<NonNullable<PropType<ResponseModel, 'error'>>>).message}
      </Alert>
    ));
  }, []);

  return null;
}
