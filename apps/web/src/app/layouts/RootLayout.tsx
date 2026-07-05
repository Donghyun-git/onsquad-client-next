import type { Metadata, Viewport } from 'next';

import React, { Suspense } from 'react';

import Script from 'next/script';
import { ViewTransitions } from 'next-view-transitions';
import { OverlayProvider } from 'overlay-kit';

import '@/app/styles/globals.css';

import { ErrorHandlingWrapper } from '@/widgets/ErrorBoundary';
import { ErrorFallback } from '@/widgets/ErrorFallback';

import { OAuthCallback } from '@/features/auth/login';

import { cn } from '@/shared/lib/utils';
import { Spinner } from '@/shared/ui/Spinner';
import { Wrapper } from '@/shared/ui/Wrapper';
import { Toaster } from '@/shared/ui/ui/toaster';

import { QueryProvider, SessionProvider } from '../providers';
import { NavDirectionTracker } from '../providers/NavDirectionTracker';
import NotificationProvider from '../providers/notification-provider';
import UserProvider from '../providers/user-provider';
import { WebViewBridge } from '../providers/webview-bridge';

export const metadata: Metadata = {
  title: '온스쿼드 - 취미생활의 아지트',
  description: 'onsquad, 온스쿼드, 취미, 생활, 아지트, 등산, 게임',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // 엣지투엣지: WebView 가 safe-area 까지 채우고, 웹이 env(safe-area-inset-*) 로 크롬 배경을 확장한다.
  viewportFit: 'cover',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="ko">
        <head></head>

        <Script strategy="lazyOnload" src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js" />
        <body className={cn('bg-background antialiased')}>
          <WebViewBridge />
          <NavDirectionTracker />
          <OverlayProvider>
            <SessionProvider>
              <UserProvider>
                <ErrorHandlingWrapper fallbackComponent={ErrorFallback} suspenseFallback={<Spinner />}>
                  <QueryProvider>
                    <NotificationProvider>
                      <Suspense fallback={null}>
                        <OAuthCallback />
                      </Suspense>
                      <Wrapper>{children}</Wrapper>
                      <Toaster />
                    </NotificationProvider>
                  </QueryProvider>
                </ErrorHandlingWrapper>
              </UserProvider>
            </SessionProvider>
          </OverlayProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
