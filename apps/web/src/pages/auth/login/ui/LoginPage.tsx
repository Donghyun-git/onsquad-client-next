import { LoginForm } from '@/features/auth/login';

import { Appbar } from '@/shared/ui/Appbar';

export default async function LoginPage() {
  return (
    <>
      <Appbar title="로그인" />
      <LoginForm />
    </>
  );
}
