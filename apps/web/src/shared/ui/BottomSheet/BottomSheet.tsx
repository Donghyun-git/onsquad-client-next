'use client';

import { ReactNode, useLayoutEffect, useState } from 'react';

import { X } from 'lucide-react';

import { Button } from '@/shared/ui/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/shared/ui/ui/drawer';

export interface BottomSheetPropsType {
  title: string;
  children?: ReactNode | ReactNode[];
  isOpen: boolean;
  onClose: () => void;
}

const BottomSheet = (props: BottomSheetPropsType) => {
  const { isOpen, onClose, children, title } = props;

  // 바텀시트를 앱 컬럼 폭에 스코프시키기 위한 포탈 타깃(사이드바와 동일). 없으면 vaul 기본값(body)으로 폴백.
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const body = document.querySelector('body') as HTMLBodyElement;

    body.style.setProperty('position', 'relative');

    setPortalContainer(document.getElementById('app-portal-root'));

    return () => {
      body.style.removeProperty('position');
    };
  }, []);

  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      preventScrollRestoration={true}
      modal={true}
      noBodyStyles={true}
      container={portalContainer ?? undefined}
    >
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader className="mt-2 flex items-center justify-between">
            <DrawerTitle className="text-xl font-medium">{title}</DrawerTitle>
            <DrawerDescription />
            <DrawerClose asChild>
              <Button variant="ghost" className="px-2" onClick={onClose}>
                <X size={16} />
              </Button>
            </DrawerClose>
          </DrawerHeader>
          <div className="p-4">{children}</div>
          <DrawerFooter className="sr-only" />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default BottomSheet;
