import type { Metadata, Viewport } from 'next';

import React from 'react';

import Script from 'next/script';
import { OverlayProvider } from 'overlay-kit';
import 'quill/dist/quill.core.css';

import '@/app/styles/globals.css';

import { ErrorHandlingWrapper } from '@/widgets/ErrorBoundary';
import { ErrorFallback } from '@/widgets/ErrorFallback';

import { OAuthCallback } from '@/features/auth/login';

import { cn } from '@/shared/lib/utils';
import { Spinner } from '@/shared/ui/Spinner';
import { Wrapper } from '@/shared/ui/Wrapper';
import { Toaster } from '@/shared/ui/ui/toaster';

import { QueryProvider, SessionProvider } from '../providers';
import NotificationProvider from '../providers/notification-provider';
import UserProvider from '../providers/user-provider';

export const metadata: Metadata = {
  title: '온스쿼드 - 취미생활의 아지트',
  description: 'onsquad, 온스쿼드, 취미, 생활, 아지트, 등산, 게임',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head></head>

      <Script strategy="lazyOnload" src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js" />
      <body className={cn('bg-background antialiased')}>
        <OverlayProvider>
          <SessionProvider>
            <UserProvider>
              <NotificationProvider>
                <ErrorHandlingWrapper fallbackComponent={ErrorFallback} suspenseFallback={<Spinner />}>
                  <QueryProvider>
                    <OAuthCallback />
                    <Wrapper>{children}</Wrapper>
                  </QueryProvider>
                </ErrorHandlingWrapper>
                <Toaster />
              </NotificationProvider>
            </UserProvider>
          </SessionProvider>
        </OverlayProvider>
      </body>
    </html>
  );
}
