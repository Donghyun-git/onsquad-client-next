import { ReactNode, RefObject } from 'react';

import { cn } from '@/shared/lib/utils';

export interface ArticlePropsType {
  slot: ReactNode | ReactNode[];
  className?: string;
  ref?: RefObject<HTMLDivElement | null>;
}

const Article = ({ slot, className, ref }: ArticlePropsType) => {
  return (
    <article ref={ref} className={cn(`rounded-xl bg-white p-6 ${className}`)}>
      {slot}
    </article>
  );
};

export default Article;
