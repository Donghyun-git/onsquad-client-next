'use client';

import { useRouter } from 'next/navigation';

export const usePageMove = () => {
  const router = useRouter();

  const handlePageMove = (path: string, options?: { scroll: boolean }) => {
    router.push(path, { scroll: options?.scroll ?? false });
  };

  return { handlePageMove };
};
