import { act, renderHook, waitFor } from '@testing-library/react';
import { HttpResponse, http } from 'msw';
import { describe, expect, it, vi } from 'vitest';

import { useLeaveCrewMutation } from '@/features/crew/detail/model/useLeaveCrewMutation';

import { server } from '../../../setup/msw/server';
import { createWrapper } from '../../utils/wrapper';

vi.mock('@/shared/lib/hooks/useToast', () => ({
  useToast: () => ({ toast: vi.fn(), hide: vi.fn() }),
}));

vi.mock('@/shared/lib/auth/handleTokenExpiration', () => ({
  handleTokenExpiration: vi.fn(),
  isTokenExpiredError: vi.fn(() => false),
}));

const CREW_ID = 1;

describe('useLeaveCrewMutation', () => {
  it('성공 시 mutation이 success 상태가 된다', async () => {
    const { result } = renderHook(() => useLeaveCrewMutation({ crewId: CREW_ID }), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      result.current.mutate();
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  it('서버 에러 시 mutation이 error 상태가 된다', async () => {
    server.use(
      http.delete('http://localhost/api/bff/crews/:crewId/members/me', () =>
        HttpResponse.json({ success: false, status: 500 }, { status: 500 }),
      ),
    );

    const { result } = renderHook(() => useLeaveCrewMutation({ crewId: CREW_ID }), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      result.current.mutate();
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
