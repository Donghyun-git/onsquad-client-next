import { auth } from '@/auth';
import { NextResponse } from 'next/server';

import { PATH } from '@/shared/config/paths';

export const proxy = auth((request) => {
  const accessToken = request.auth?.accessToken;

  const { redirect, next } = NextResponse;

  if (!accessToken) {
    const protectedPaths = ['/crews'];

    if (protectedPaths.includes(request.nextUrl.pathname)) {
      const root = new URL(PATH.root, request.url);

      return redirect(root);
    }
  }

  if (accessToken) {
    const protectedPaths = ['/login', '/join'];

    if (protectedPaths.includes(request.nextUrl.pathname)) {
      const root = new URL(PATH.root, request.url);

      return redirect(root);
    }
  }

  return next();
});

export const config = {
  matcher: ['/login', '/join', '/crews'],
};
