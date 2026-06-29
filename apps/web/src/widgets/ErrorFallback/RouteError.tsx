'use client';

import { ErrorFallback } from './ErrorFallback';

interface RouteErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/** Next App Router 의 error.tsx({ error, reset }) 를 기존 ErrorFallback 으로 연결하는 어댑터. */
export function RouteError({ error, reset }: RouteErrorProps) {
  return <ErrorFallback error={error} resetErrorBoundary={reset} />;
}
