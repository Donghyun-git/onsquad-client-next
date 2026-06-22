'use client';

import { useQueries } from '@tanstack/react-query';

import {
  myCrewParticipantsGetFetch,
  myCrewRequestsGetFetch,
  myHistoriesGetFetch,
  mySquadRequestsGetFetch,
} from '@/shared/api/member';

import { makeQueryOptions } from '../queries/makeQueryOptions';

// Appbar '내 활동' 메뉴 배지 카운트.
// 쿼리 키·페처는 entities/member 의 memberQueries 와 동일하게 맞춰 페이지 캐시·무효화를 공유한다.
// (shared 레이어는 entities 를 import 할 수 없으므로 makeQueryOptions 로 같은 키를 직접 구성한다 — FSD 단방향 준수)
const toQueryDate = (date: Date) => date.toISOString().slice(0, 10);

// 활동내역은 from·to 가 필수다. HistoryTab 과 동일하게 최근 1년 범위를 사용해 캐시를 공유한다.
const recentYearRange = () => {
  const to = new Date();
  const from = new Date(to);
  from.setFullYear(to.getFullYear() - 1);
  return { from: toQueryDate(from), to: toQueryDate(to) };
};

export interface MyActivityCounts {
  /** 참여중인 크루 수 */
  crewCount: number;
  /** 합류신청(크루 + 스쿼드) 수 */
  applicationCount: number;
  /** 활동내역(최근 1년) 수 */
  historyCount: number;
}

/**
 * 내 활동(크루/합류신청/활동내역) 카운트 조회.
 * @param enabled 로그인 상태에서만 조회하도록 게이트
 */
export const useMyActivityCounts = (enabled: boolean): MyActivityCounts => {
  const range = recentYearRange();

  const [crew, crewRequests, squadRequests, histories] = useQueries({
    queries: [
      {
        ...makeQueryOptions(['member', 'myCrewParticipants'], () => myCrewParticipantsGetFetch()),
        enabled,
        throwOnError: false,
      },
      {
        ...makeQueryOptions(['member', 'myCrewRequests', undefined, undefined], () => myCrewRequestsGetFetch()),
        enabled,
        throwOnError: false,
      },
      {
        ...makeQueryOptions(['member', 'mySquadRequests', undefined, undefined], () => mySquadRequestsGetFetch()),
        enabled,
        throwOnError: false,
      },
      {
        ...makeQueryOptions(['member', 'histories', range], () => myHistoriesGetFetch(range)),
        enabled,
        throwOnError: false,
      },
    ],
  });

  return {
    crewCount: crew.data?.data.length ?? 0,
    applicationCount: (crewRequests.data?.data.totalCount ?? 0) + (squadRequests.data?.data.totalCount ?? 0),
    historyCount: histories.data?.data.totalCount ?? 0,
  };
};
