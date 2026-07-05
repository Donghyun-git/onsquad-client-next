'use client';

import { Link } from 'next-view-transitions';
import { usePathname } from 'next/navigation';
import type { ComponentProps } from 'react';

import { setNavDirection } from '@/shared/lib/utils/navDirection';

type SlideLinkProps = ComponentProps<typeof Link>;

/**
 * next-view-transitions `Link` 래퍼. 클릭 시 forward 방향을 태깅해
 * 전방(오른쪽→왼쪽) 슬라이드로 페이지를 이동한다.
 * 목적지가 현재 경로와 같으면(예: 홈에서 로고 클릭) 이동을 막는다.
 */
export const SlideLink = ({ onClick, ...props }: SlideLinkProps) => {
  const pathname = usePathname();

  const handleClick: SlideLinkProps['onClick'] = (event) => {
    if (typeof props.href === 'string' && props.href === pathname) {
      event.preventDefault();
      return;
    }

    setNavDirection('forward');
    onClick?.(event);
  };

  return <Link {...props} onClick={handleClick} />;
};
