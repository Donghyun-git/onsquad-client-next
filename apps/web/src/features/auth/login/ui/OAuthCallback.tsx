'use client';

import { useSearchParams } from 'next/navigation';

import { useEffect } from 'react';

import { signIn } from 'next-auth/react';

import { PATH } from '@/shared/config/paths';
import { usePageMove } from '@/shared/lib/hooks';

function OAuthCallback() {
  const searchParams = useSearchParams();
  const { handleReplace } = usePageMove();

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

        handleReplace(PATH.root);
      } catch (error) {
        console.error('OAuth 콜백 처리 실패:', error);
        handleReplace(PATH.login);
      }
    };

    handleCallback();
  }, [searchParams, handleReplace]);

  return null;
}

export default OAuthCallback;
