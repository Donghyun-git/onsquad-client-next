'use client';

import React, { useEffect } from 'react';

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

  useEffect(() => {
    const body = document.body;

    body.style.setProperty('overflow', 'hidden');

    return () => {
      body.style.removeProperty('overflow');
    };
  }, []);

  return (
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
    </div>
  );
};

export default Spinner;
