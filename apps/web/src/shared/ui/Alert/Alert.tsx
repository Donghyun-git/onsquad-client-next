import { ReactNode } from 'react';

import { closeWithAnimation } from '@/shared/lib/overlay';
import { cn } from '@/shared/lib/utils';
import type { OverlayProps } from '@/shared/types/overlay';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogTitle,
} from '@/shared/ui/ui/alert-dialog';

import { Button } from '../ui/button';

export interface AlertProps extends Partial<Omit<OverlayProps, 'isOpen'>>, Pick<OverlayProps, 'isOpen'> {
  title?: ReactNode | string;
  headerClassName?: string;
  children: ReactNode | string;
  buttonSlot?: ReactNode | ReactNode[];
}

const Alert = (props: AlertProps) => {
  const { title, headerClassName, children, buttonSlot, isOpen, close, unmount } = props;

  const handleClose = () => closeWithAnimation(close, unmount);

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogOverlay />
      <AlertDialogContent className="p-0">
        <AlertDialogHeader className={cn('px-4 pt-9', headerClassName)}>
          <AlertDialogTitle className="text-center text-xl text-grayscale900">{title || '알림'}</AlertDialogTitle>
          <AlertDialogDescription className="hidden" />
        </AlertDialogHeader>
        <div className="px-4 pb-4 text-center">{children}</div>
        <AlertDialogFooter className="grid w-full grid-cols-1 px-0">
          <div className="-mx-[0.075rem] -mb-[0.075rem]">
            {buttonSlot || (
              <>
                <Button onClick={handleClose} className={cn('w-full rounded-none rounded-bl-md rounded-br-md')}>
                  확인
                </Button>
              </>
            )}
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Alert;
