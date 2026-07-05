import { Zap } from 'lucide-react';

import { cn } from '@/shared/lib/utils';

interface ZapBadgeProps {
  /** 위치·크기 등 추가 스타일. 기본 원형 크기(h-5 w-5)를 덮어쓸 수 있다. */
  className?: string;
  'aria-label'?: string;
}

/** 원형 primary500 배경 + 흰색 Zap 아이콘 배지. (내 크루 표시 / 안읽음 표시 등에 재사용) */
const ZapBadge = ({ className, 'aria-label': ariaLabel }: ZapBadgeProps) => {
  return (
    <span
      aria-label={ariaLabel}
      className={cn('flex h-5 w-5 items-center justify-center rounded-full bg-primary500', className)}
    >
      <Zap className="h-3 w-3 fill-white text-white" />
    </span>
  );
};

export default ZapBadge;
