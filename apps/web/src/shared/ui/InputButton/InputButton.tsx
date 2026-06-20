import React from 'react';

import Image from 'next/image';

import { cn } from '@/shared/lib/utils';

export interface InputButtonPropsType extends React.ButtonHTMLAttributes<HTMLDivElement> {
  buttonText: string;
  leftIcon?: string;
  color?: string;
  backgroundColor?: string;
}

const InputButton = (props: InputButtonPropsType) => {
  const { buttonText, onClick, leftIcon, disabled, backgroundColor = '#f8f8f8' } = props;

  return (
    <div
      onClick={!disabled ? onClick : () => {}}
      className={cn(
        'absolute right-2 top-2 mx-auto my-0 flex cursor-pointer items-center justify-center rounded-md px-2 py-1 text-xs text-grayscale500',
        disabled && 'cursor-not-allowed text-grayscale900',
      )}
      style={{ backgroundColor }}
    >
      {leftIcon ? <Image className="mr-2 w-3" src={leftIcon} alt={leftIcon.split('.')[0]} /> : null}
      {buttonText}
    </div>
  );
};

export default InputButton;
