'use client';

import { useNavDirectionTracker } from '@/shared/lib/hooks/useNavDirectionTracker';
import { useSuppressViewTransitionAbort } from '@/shared/lib/hooks/useSuppressViewTransitionAbort';

export const NavDirectionTracker = () => {
  useNavDirectionTracker();
  useSuppressViewTransitionAbort();

  return null;
};
