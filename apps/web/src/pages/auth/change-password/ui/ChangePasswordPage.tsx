import { ChangePasswordForm } from '@/features/auth/change-password';

import { Appbar } from '@/shared/ui/Appbar';

export default function ChangePasswordPage() {
  return (
    <>
      <Appbar isMenuHeader={false} title="비밀번호 변경" />
      <ChangePasswordForm />
    </>
  );
}
