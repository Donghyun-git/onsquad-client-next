'use client';

import { useCallback, type ReactNode } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';

import { usePullToRefresh } from '@/shared/lib/hooks';
import { useScrollContainerRef } from '@/shared/ui/ScrollContainer';

const REFRESH_HOLD = 44;

interface PullToRefreshProps {
  children: ReactNode;
  /** 당김 새로고침 동작. 미지정 시 현재 화면의 활성 쿼리를 무효화(refetch)한다. */
  onRefresh?: () => Promise<unknown> | void;
}

/**
 * 자식 콘텐츠에 Pull-to-Refresh 를 부착한다. 상위 ScrollContainer 의 스크롤 컨테이너를 참조해
 * top 오버스크롤 당김을 감지하고, 무한스크롤과 동일한 로딩 아이콘(Loader2)을 인디케이터로 쓴다.
 */
export const PullToRefresh = ({ children, onRefresh }: PullToRefreshProps) => {
  const scrollRef = useScrollContainerRef();
  const queryClient = useQueryClient();

  const refresh = useCallback(
    () => (onRefresh ? onRefresh() : queryClient.invalidateQueries({ refetchType: 'active' })),
    [onRefresh, queryClient],
  );

  const { pullDistance, isRefreshing, threshold } = usePullToRefresh(scrollRef, refresh);

  const offset = isRefreshing ? REFRESH_HOLD : pullDistance;
  const showSpinner = isRefreshing || pullDistance > 4;

  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 flex items-end justify-center overflow-hidden"
        style={{ height: offset }}
      >
        {showSpinner && (
          <Loader2
            className="mb-2 h-6 w-6 animate-spin text-primary500"
            style={{ opacity: isRefreshing ? 1 : Math.min(pullDistance / threshold, 1) }}
          />
        )}
      </div>

      <div
        style={{
          transform: `translateY(${offset}px)`,
          transition: pullDistance > 0 && !isRefreshing ? 'none' : 'transform 0.2s ease',
        }}
      >
        {children}
      </div>
    </div>
  );
};
