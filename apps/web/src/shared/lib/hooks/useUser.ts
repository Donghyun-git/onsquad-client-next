'use client';

import type { Session } from 'next-auth';
import { useSession } from 'next-auth/react';

/** next-auth 세션을 단일 원천으로 현재 사용자(Session)를 반환한다. 미인증/로그아웃 시 null. */
export const useUser = (): Session | null => useSession().data ?? null;
