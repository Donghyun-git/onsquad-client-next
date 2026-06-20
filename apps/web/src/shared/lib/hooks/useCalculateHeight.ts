import { RefObject, useEffect, useState } from 'react';

import { isNumber } from 'es-toolkit/compat';

interface UseCalculateHeightProps {
  layoutElement: RefObject<HTMLDivElement | null>;
  subtractHeight?: number;
}

export const useCalculateHeight = ({ layoutElement, subtractHeight = 0 }: UseCalculateHeightProps) => {
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    const calculateHeight = () => {
      if (!layoutElement.current) return;

      const subtractHeightValue = isNumber(subtractHeight) ? subtractHeight : (subtractHeight ?? 420);

      const height = layoutElement.current?.clientHeight - subtractHeightValue;

      setHeight(height);
    };

    const observer = new ResizeObserver(calculateHeight);

    if (!layoutElement.current) return;

    observer.observe(layoutElement.current);

    return () => observer.disconnect();
  }, []);

  return height;
};
