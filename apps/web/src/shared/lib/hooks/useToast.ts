'use client';

import { ReactElement, useRef } from 'react';

import type { LucideIcon } from 'lucide-react';

import { TOAST } from '@/shared/config/toast';
import { useToast as useLibToast } from '@/shared/ui/ui/use-toast';

export interface ToastMessageType {
  title: string;
  className: ValueOf<typeof TOAST>;
  icon?: LucideIcon | ReactElement<LucideIcon>;
}

const TOAST_TIMEOUT = 1500;

/**
 * @example
 *
 * ```tsx
 * toast({
 *    title: '합류 신청에 성공했습니다.',
 *    className: TOAST.primary,
 *    icon: <CircleX onClick={() => hide()} />,
 *  })
 * ```
 */
export const useToast = () => {
  const { toast, dismiss: libDismiss } = useLibToast();

  const dismissTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const dismiss = () => {
    if (dismissTimeoutRef.current) {
      clearTimeout(dismissTimeoutRef.current);
    }

    dismissTimeoutRef.current = setTimeout(() => {
      libDismiss();
    }, TOAST_TIMEOUT);
  };

  const show = ({ title, icon, className }: ToastMessageType) => {
    toast({
      title,
      icon,
      className,
    });

    dismiss();
  };

  return { toast: show, hide: libDismiss };
};
