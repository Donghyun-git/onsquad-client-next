import { RequestInit as DefaultRequestInit } from 'next/dist/server/web/spec-extension/request';

export type AsyncRequestInterceptor = (config: DefaultRequestInit) => Promise<DefaultRequestInit> | DefaultRequestInit;

export interface ExtendedRequestInit extends DefaultRequestInit {
  onRequest?: AsyncRequestInterceptor;
  onResponse?: (response: Response) => Response | Promise<Response>;
  onError?: (error: any) => any;
}
