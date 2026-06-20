'use client';

import React, { createContext, useContext, useEffect, useRef } from 'react';

import { SseClient } from '@/shared/api/sse/sse-client';
import { useUserStore } from '@/shared/lib/store/useUserStore';

export const NotificationContext = createContext<SseClient | null>(null);

export const useNotification = () => {
  return useContext(NotificationContext);
};

const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const sseRef = useRef<SseClient | null>(null);

  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (!sseRef.current) {
      sseRef.current = new SseClient();
    }

    if (sseRef.current) {
      const sseClient = sseRef.current;

      const isConnected = sseClient.getSse()?.readyState === EventSource.OPEN;

      if (user) {
        if (isConnected) {
          return;
        }

        const accessToken = user.accessToken;

        if (accessToken) {
          sseClient.connect(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/notifications/sse?accessToken=${accessToken}`);
        }
      }

      if (!user) {
        if (isConnected) {
          sseClient.disconnect();
        }
      }
    }
  }, [user?.accessToken]);

  useEffect(() => {
    return () => sseRef.current?.disconnect();
  }, []);

  return <NotificationContext.Provider value={sseRef.current}>{children}</NotificationContext.Provider>;
};

export default NotificationProvider;
