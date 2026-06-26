import { afterEach, describe, expect, it, vi } from 'vitest';

import { cleanup, render, screen } from '@testing-library/react';

import type { Session } from 'next-auth';

import Profile from '@/shared/ui/Profile/Profile';

afterEach(() => cleanup());

vi.mock('@/shared/ui/Avatar', () => ({
  Avatar: ({ imageUrl }: { imageUrl?: string; className?: string }) => (
    <div data-testid="avatar" data-image-url={imageUrl} />
  ),
}));

const mockSession: Session = {
  id: 1,
  nickname: '테스터',
  user: { email: 'test@example.com' },
  gender: 'male',
  birth: '1990-01-01',
  userType: 'normal',
  address: '서울',
  addressDetail: '강남구',
  accessToken: 'access-token',
  refreshToken: 'refresh-token',
  mbti: 'INTJ',
  profileImage: '/profile.png',
  introduce: '소개입니다',
  kakaoLink: '',
  expires: '2099-12-31',
};

describe('Profile', () => {
  it('session=null이면 "로그인 후 이용해주세요!" 텍스트가 렌더링된다', () => {
    render(<Profile session={null} />);

    expect(screen.getByText('로그인 후 이용해주세요!')).toBeDefined();
  });

  it('유효한 session이 전달되면 session.nickname이 렌더링된다', () => {
    render(<Profile session={mockSession} />);

    expect(screen.getByText('테스터')).toBeDefined();
  });
});
