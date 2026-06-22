'use client';

import { useQuery } from '@tanstack/react-query';

import { crewQueries } from '@/entities/crew';

import { CrewList } from '@/widgets/CrewList';
import { Skeleton } from '@/shared/ui/Skeleton';

/**
 * 메인페이지 크루 리스트 (ISR 정적 셸 + CSR 데이터).
 *
 * - 클라이언트에서 crewListGetFetch(apiFetch)로 조회 → 로그인 상태면 store 토큰이 실려
 *   권한 포함(개인화) 리스트, 비로그인이면 공개 리스트가 내려온다.
 * - throwOnError:false 라 실패해도 전역 ErrorBoundary 로 던지지 않는다.
 */
export function HomeCrewList() {
  const { data, isLoading } = useQuery({ ...crewQueries.list(), throwOnError: false });

  if (isLoading) {
    return <Skeleton.CrewList className="pt-6" />;
  }

  return <CrewList list={data?.results ?? []} />;
}
