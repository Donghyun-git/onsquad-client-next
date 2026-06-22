'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { HashLoader } from 'react-spinners';

import { cn } from '@/shared/lib/utils';

export interface SpinnerPropsType {
  /**
   * Spinner text
   */
  helperText?: string;

  splitCount?: number;
}

const Spinner = (props: SpinnerPropsType) => {
  const { helperText = '취미생활의 즐거움', splitCount = 5 } = props;

  // 오버레이를 document.body 로 포탈한다. 레이아웃 컨텐츠 래퍼(fixed z-0)가 만드는
  // stacking context 에 갇혀 Appbar(z-[100]) 아래로 깔리는 것을 방지한다.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const body = document.body;

    body.style.setProperty('overflow', 'hidden');

    return () => {
      body.style.removeProperty('overflow');
    };
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed left-0 top-0 z-[9999] flex h-screen w-screen flex-col items-center justify-center bg-black bg-opacity-40">
      <HashLoader size={40} color="#F87315" />

      <div className="flex items-center">
        {helperText.split('').map((text, i) => (
          <span
            key={i}
            className={cn(
              `mt-4 inline-block animate-bounceInOrder text-lg font-semibold text-primary ${
                i === splitCount && 'ml-2'
              }`,
            )}
            style={{ animationDelay: `${i * 0.2}s` }}
          >
            {text}
          </span>
        ))}
      </div>
    </div>,
    document.body,
  );
};

export default Spinner;
