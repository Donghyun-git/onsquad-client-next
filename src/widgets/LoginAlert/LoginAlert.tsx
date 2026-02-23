'use client';

import { useRouter } from 'next/navigation';

import { PATH } from '@/shared/config/paths';
import type { OverlayProps } from '@/shared/types/overlay';
import { Alert } from '@/shared/ui/Alert';
import { BUTTON } from '@/shared/ui/Alert/style';
import { Button } from '@/shared/ui/ui/button';

type LoginAlertProps = OverlayProps;

const LoginAlert = ({ isOpen, close, unmount }: LoginAlertProps) => {
  const router = useRouter();

  const handleClose = () => {
    close?.();

    setTimeout(() => {
      unmount?.();
    }, 300);
  };

  return (
    <Alert
      isOpen={isOpen}
      close={close}
      unmount={unmount}
      title="로그인이 필요한 서비스에요."
      buttonSlot={
        <div className="grid grid-cols-2">
          <Button className={BUTTON.CANCEL} onClick={handleClose}>
            이전으로
          </Button>
          <Button
            className={BUTTON.ACTION}
            onClick={() => {
              handleClose();

              router.push(PATH.login);
            }}
          >
            로그인
          </Button>
        </div>
      }
    >
      <div className="flex flex-col gap-2">
        <span className="text-lg font-semibold text-grayscale700">로그인 후 다시 시도해주세요.</span>
        <div className="flex items-center justify-center gap-2 text-sm">
          <span className="text-grayscale700">아직 회원이 아니신가요?</span>
          <span
            className="cursor-pointer text-blue400 underline"
            onClick={() => {
              close();

              router.push(PATH.join);
            }}
          >
            회원가입
          </span>
        </div>
      </div>
    </Alert>
  );
};

export default LoginAlert;
