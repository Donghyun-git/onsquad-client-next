'use client';

import React, { createContext, useContext, useEffect, useRef } from 'react';

import {
  NOTIFICATION_SSE_EVENT,
  getNotificationToastTitle,
  type NotificationMessage,
} from '@/entities/notification';

import { SseClient } from '@/shared/api/sse/sse-client';
import { TOAST } from '@/shared/config/toast';
import { useUser } from '@/shared/lib/hooks';
import { useToast } from '@/shared/lib/hooks/useToast';

export const NotificationContext = createContext<SseClient | null>(null);

export const useNotification = () => {
  return useContext(NotificationContext);
};

const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const sseRef = useRef<SseClient | null>(null);

  const user = useUser();

  const { toast } = useToast();

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

          const handleNotification = (event: MessageEvent) => {
            try {
              const data = JSON.parse(event.data) as NotificationMessage;

              const title = getNotificationToastTitle(data);

              if (title) {
                toast({ title, className: TOAST.primary });
              }
            } catch {
              // heartbeat/connect 등 파싱 불가하거나 매핑 없는 이벤트는 무시한다.
            }
          };

          // 백엔드는 모든 알림을 named event 'user' 로 전송한다(SseTopic.USER).
          sseClient.on(NOTIFICATION_SSE_EVENT, handleNotification);
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
