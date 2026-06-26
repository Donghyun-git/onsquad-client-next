import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { cleanup, fireEvent, render, screen } from '@testing-library/react';

import type { FallbackProps } from '@/shared/types/error';

import ErrorBoundary from '@/widgets/ErrorBoundary/ErrorBoundary';

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

beforeEach(() => {
  vi.spyOn(console, 'error').mockImplementation(() => {});
  vi.spyOn(console, 'log').mockImplementation(() => {});
});

/** 에러를 강제로 던지는 헬퍼 컴포넌트 */
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) throw new Error('test error');
  return <div>정상 렌더링</div>;
};

/** 에러 상태를 표시하는 Fallback 컴포넌트 */
const Fallback = ({ error, resetErrorBoundary }: FallbackProps) => (
  <div>
    <p>에러: {error?.message}</p>
    <button onClick={resetErrorBoundary}>다시 시도</button>
  </div>
);

describe('ErrorBoundary', () => {
  it('에러가 없을 때 자식 컴포넌트가 렌더링된다', () => {
    render(
      <ErrorBoundary FallbackComponent={Fallback} onReset={vi.fn()}>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>,
    );

    expect(screen.getByText('정상 렌더링')).toBeDefined();
  });

  it('에러 발생 시 FallbackComponent가 렌더링된다', () => {
    render(
      <ErrorBoundary FallbackComponent={Fallback} onReset={vi.fn()}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>,
    );

    expect(screen.getByText('에러: test error')).toBeDefined();
  });

  it('FallbackComponent에 error 객체가 전달된다', () => {
    render(
      <ErrorBoundary FallbackComponent={Fallback} onReset={vi.fn()}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>,
    );

    expect(screen.getByText('에러: test error')).toBeDefined();
  });

  it('FallbackComponent의 resetErrorBoundary 버튼 클릭 시 onReset 콜백이 호출된다', () => {
    const onReset = vi.fn();

    render(
      <ErrorBoundary FallbackComponent={Fallback} onReset={onReset}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>,
    );

    fireEvent.click(screen.getByRole('button', { name: '다시 시도' }));

    expect(onReset).toHaveBeenCalledTimes(1);
  });

  it('resetErrorBoundary 클릭 시 onReset이 정확히 한 번 호출되고 Fallback이 노출된 상태이다', () => {
    const onReset = vi.fn();

    render(
      <ErrorBoundary FallbackComponent={Fallback} onReset={onReset}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>,
    );

    // 에러 상태: Fallback 노출 확인
    expect(screen.getByText('에러: test error')).toBeDefined();

    // resetErrorBoundary 클릭 → onReset이 정확히 한 번 호출된다
    fireEvent.click(screen.getByRole('button', { name: '다시 시도' }));
    expect(onReset).toHaveBeenCalledTimes(1);
  });
});
