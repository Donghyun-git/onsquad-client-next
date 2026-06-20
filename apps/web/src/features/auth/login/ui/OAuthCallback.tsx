'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { useEffect } from 'react';

import { signIn } from 'next-auth/react';

import { PATH } from '@/shared/config/paths';

function OAuthCallback() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const accessToken = searchParams?.get('accessToken');
    const refreshToken = searchParams?.get('refreshToken');

    if (!accessToken || !refreshToken) {
      return;
    }

    const handleCallback = async () => {
      try {
        await signIn('kakao', {
          redirect: false,
          callbackUrl: PATH.root,
          accessToken,
          refreshToken,
        });

        router.replace(PATH.root);
      } catch (error) {
        console.error('OAuth 콜백 처리 실패:', error);
        router.replace(PATH.login);
      }
    };

    handleCallback();
  }, [searchParams, router]);

  return null;
}

export default OAuthCallback;
