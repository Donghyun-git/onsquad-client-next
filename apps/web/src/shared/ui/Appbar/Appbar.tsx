'use client';

import { useRouter } from 'next/navigation';

import { Bell, ChevronLeft, Text as TextIcon } from 'lucide-react';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

import { userSocialLoginGetFetch } from '@/shared/api/user/userSocialLoginGetFetch';
import { USER_TYPE } from '@/shared/config';
import { PATH } from '@/shared/config/paths';
import { useUser } from '@/shared/lib/hooks';
import { cn } from '@/shared/lib/utils';
import { NavButton } from '@/shared/ui/NavButton';
import { Button } from '@/shared/ui/ui/button';
import { Separator } from '@/shared/ui/ui/separator';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/shared/ui/ui/sheet';

import { CountLabel } from '../CountLabel';
import { Profile } from '../Profile';

export interface AppbarPropsType {
  isMenuHeader?: boolean;
  title?: string;
}

const Appbar = ({ isMenuHeader = true, title }: AppbarPropsType) => {
  const user = useUser();

  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirectTo: PATH.root });
  };

  if (!isMenuHeader) {
    return (
      <div
        className={cn(
          'fixed left-1/2 top-0 z-[100] flex w-full min-w-[20rem] max-w-[45rem] -translate-x-1/2 transform items-center justify-between bg-white shadow-md-bottom',
        )}
      >
        <div className="ml-4 flex h-14 w-20 cursor-pointer items-center" onClick={() => router.back()}>
          <ChevronLeft color="#636363" strokeWidth={1.25} />
        </div>
        <h3 className="font-bold">{title}</h3>
        <div className="mr-4 w-20"></div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        `fixed left-1/2 top-0 z-[100] flex w-full min-w-[20rem] max-w-[45rem] -translate-x-1/2 transform items-center justify-between bg-white shadow-md-bottom`,
      )}
    >
      <Link className="relative ml-4 h-14 w-20" href={PATH.root} scroll={false}>
        <Image src="/icons/onsquad_logo.svg" alt="온스쿼드" fill priority />
        <h1 className="sr-only">온스쿼드</h1>
      </Link>

      <div className="relative mr-4 flex items-center gap-2">
        {/* 알림: 로그인 상태에서만 노출, 햄버거 메뉴 좌측. */}
        {user && (
          <Link href={PATH.notifications} aria-label="알림" scroll={false}>
            <Bell color="#636363" strokeWidth={1.5} className="cursor-pointer" />
          </Link>
        )}
        <Sheet>
          <SheetTrigger asChild>
            <TextIcon color="#636363" strokeWidth={1.5} className="cursor-pointer" />
          </SheetTrigger>
          <SheetContent className="overflow-y-auto rounded-tl-2xl bg-grayscale100 focus-visible:border-0 focus-visible:outline-0">
            <SheetTitle className="mt-5">
              <Profile session={user} />
            </SheetTitle>
            {!user ? (
              <>
                <Separator className="my-6" />

                <div className="mb-4 flex items-center">
                  <SheetDescription className="w-full text-center">소셜계정 혹은 이메일로 로그인하기</SheetDescription>
                </div>
                <div className="flex flex-col items-center justify-center gap-2">
                  <SheetClose asChild>
                    <Link className="w-full focus-visible:outline-none" href={PATH.login} scroll={false}>
                      <Button className="w-full font-semibold" variant="outline">
                        이메일로 로그인 하기
                      </Button>
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button
                      className="text-semibold w-full gap-2 bg-kakao text-kakao-text hover:bg-kakao-hover focus-visible:outline-kakao active:bg-kakao-hover"
                      onClick={async () => {
                        try {
                          const kakaoLoginRes = await userSocialLoginGetFetch({
                            platform: 'kakao',
                          });

                          const redirectUrl = kakaoLoginRes.headers.get('location');

                          if (redirectUrl) {
                            location.href = redirectUrl;
                          }
                        } catch (error) {
                          console.error('카카오 로그인 실패', error);
                        }
                      }}
                    >
                      <Image src="/icons/kakaologo.svg" alt="카카오로고" width={20} height={20} priority />
                      카카오로 로그인하기
                    </Button>
                  </SheetClose>
                </div>
                <div className="mt-8 flex flex-col items-center gap-2 text-gray-700">
                  아직 회원이 아니신가요?
                  <Link className="text-blue-500 underline" href={PATH.join} scroll={false}>
                    회원가입
                  </Link>
                </div>
              </>
            ) : (
              <div className="flex flex-col">
                <div className="mt-6 flex flex-col items-center justify-center gap-2">
                  <SheetClose asChild>
                    <NavButton onClick={() => router.push(PATH.profile, { scroll: false })}>프로필 편집</NavButton>
                  </SheetClose>
                </div>
                <Separator className="my-6" />
                <div className="flex flex-grow flex-col">
                  <ul className="flex flex-col">
                    <li>
                      <SheetDescription className="mb-3 w-full">계정정보</SheetDescription>
                      <div className="px-3 py-2 text-grayscale700">{user.user?.email}</div>
                      {user.userType === USER_TYPE.general && (
                        <NavButton
                          onClick={() => {
                            router.push(PATH.changePassword, { scroll: false });
                          }}
                        >
                          비밀번호 변경
                        </NavButton>
                      )}
                    </li>
                    <li>
                      <Separator className="mb-3 mt-6" />
                    </li>
                    <li className="mt-3">
                      <SheetDescription className="mb-3 w-full">내 활동</SheetDescription>
                      <div className="flex flex-col gap-2">
                        <SheetClose asChild>
                          <NavButton onClick={() => router.push(PATH.myCrews, { scroll: false })}>
                            <div className="flex items-center gap-2">
                              <span>내 크루</span>
                              <CountLabel count={12} />
                            </div>
                          </NavButton>
                        </SheetClose>
                        <SheetClose asChild>
                          <NavButton onClick={() => router.push(PATH.myApplications, { scroll: false })}>
                            <div className="flex items-center gap-2">
                              <span>합류신청</span>
                              <CountLabel count={12} />
                            </div>
                          </NavButton>
                        </SheetClose>
                        <SheetClose asChild>
                          <NavButton onClick={() => router.push(PATH.activity, { scroll: false })}>
                            <div className="flex items-center gap-2">
                              <span>활동내역</span>
                              <CountLabel count={12} />
                            </div>
                          </NavButton>
                        </SheetClose>
                      </div>
                    </li>
                    <li className="mb-6">
                      <Separator className="my-6" />

                      <div className="mt-6 flex flex-col items-center justify-center gap-2">
                        <SheetClose asChild>
                          <NavButton onClick={handleSignOut}>로그아웃</NavButton>
                        </SheetClose>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Appbar;
