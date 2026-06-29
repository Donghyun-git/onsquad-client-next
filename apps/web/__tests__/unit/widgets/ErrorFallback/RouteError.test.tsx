import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render } from '@testing-library/react';

const errorFallbackSpy = vi.fn();
vi.mock('@/widgets/ErrorFallback/ErrorFallback', () => ({
  ErrorFallback: (props: { error: Error | null; resetErrorBoundary: () => void }) => {
    errorFallbackSpy(props);
    return <div data-testid="error-fallback" />;
  },
}));

import { RouteError } from '@/widgets/ErrorFallback/RouteError';

afterEach(() => {
  cleanup();
  errorFallbackSpy.mockClear();
});

describe('RouteError', () => {
  it('error 를 ErrorFallback 에 그대로 전달한다', () => {
    const error = Object.assign(new Error('boom'), { digest: 'abc' });
    render(<RouteError error={error} reset={vi.fn()} />);
    expect(errorFallbackSpy).toHaveBeenCalledWith(expect.objectContaining({ error }));
  });

  it('reset 을 resetErrorBoundary 로 매핑한다', () => {
    const reset = vi.fn();
    render(<RouteError error={new Error('x')} reset={reset} />);
    const props = errorFallbackSpy.mock.calls[0][0];
    props.resetErrorBoundary();
    expect(reset).toHaveBeenCalledTimes(1);
  });
});
