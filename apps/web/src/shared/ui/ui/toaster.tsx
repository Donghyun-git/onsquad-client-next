'use client';

import React from 'react';

import { LucideIcon } from 'lucide-react';

import { Toast, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from '@/shared/ui/ui/toast';

import { useToast } from './use-toast';

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, icon, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle className="mt-0.5 text-base font-semibold">{title}</ToastTitle>}
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
            {icon && React.cloneElement(icon as React.ReactElement<LucideIcon>)}
            {action}
            {/* <ToastClose /> */}
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
