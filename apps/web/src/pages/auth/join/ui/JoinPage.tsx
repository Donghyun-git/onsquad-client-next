import { JoinForm } from '@/features/auth/join';

import { Appbar } from '@/shared/ui/Appbar';

export default function JoinPage() {
  return (
    <>
      <Appbar isMenuHeader={false} title="회원가입" />
      <JoinForm />
    </>
  );
}
