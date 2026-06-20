'use client';

import { forwardRef } from 'react';

import { cn } from '@/shared/lib/utils';

import { Button, ButtonProps } from '../ui/button';

interface PostButtonPropsType extends ButtonProps {
  onPageMove: () => void;
}

/**
 * 작성 버튼
 * -----
 * @example
 *  <PostButton onPageMove={handlePageMove}>
 *      <PencilLine size={12} strokeWidth={2} />
 *      <Text.xxs className="ml-1 font-bold">글쓰기</Text.xxs>
 *  </PostButton>
 */
const PostButton = forwardRef<HTMLButtonElement, PostButtonPropsType>((props, ref) => {
  const { children, className, onPageMove, ...rest } = props;

  return (
    <Button
      ref={ref}
      variant="outline"
      className={cn(`h-fit rounded-full border-0 bg-white px-1 py-0.5 ${className}`)}
      onClick={onPageMove}
      {...rest}
    >
      {children}
    </Button>
  );
});

PostButton.displayName = 'PostButton';

export default PostButton;
