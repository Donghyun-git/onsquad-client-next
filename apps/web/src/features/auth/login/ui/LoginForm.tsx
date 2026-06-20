'use client';

import { useRouter } from 'next/navigation';

import { useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { CircleX } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { FormProvider, useForm } from 'react-hook-form';

import { PATH } from '@/shared/config/paths';
import { TOAST } from '@/shared/config/toast';
import { useToast } from '@/shared/lib/hooks/useToast';
import { Input } from '@/shared/ui/Input';
import { Spinner } from '@/shared/ui/Spinner';
import { Button } from '@/shared/ui/ui/button';

import { loginSchema } from './validator';

const LoginForm = () => {
  const router = useRouter();

  const { toast, hide } = useToast();

  const [displaySpinner, setDisplaySpinner] = useState<boolean>(false);

  const method = useForm({
    mode: 'onChange',
    resolver: yupResolver(loginSchema),
    values: {
      email: '',
      password: '',
    },
  });

  const { handleSubmit: submit, getValues } = method;

  const handleSubmit = submit(async () => {
    setDisplaySpinner(true);

    try {
      const signInRes = await signIn('credentials', {
        redirect: false,
        redirectTo: PATH.root,
        ...getValues(),
      });

      if (signInRes?.error) {
        const errorMessage = signInRes.code;

        setDisplaySpinner(false);

        toast({
          title: errorMessage || '로그인 실패',
          className: TOAST.error,
          icon: <CircleX onClick={() => hide()} />,
        });

        return;
      }

      if (!signInRes?.ok) {
        setDisplaySpinner(false);

        toast({
          title: signInRes?.error || '로그인 실패',
          className: TOAST.error,
          icon: <CircleX onClick={() => hide()} />,
        });

        return;
      }

      setDisplaySpinner(false);

      toast({
        title: '로그인 완료',
        className: TOAST.success,
        icon: <CircleX onClick={() => hide()} />,
      });

      router.push(PATH.root, { scroll: false });
    } catch (error) {
      setDisplaySpinner(false);

      console.error(error);
    }
  });

  return (
    <>
      {displaySpinner ? <Spinner /> : null}
      <FormProvider {...method}>
        <form className="mt-4 flex flex-col items-center gap-6" onSubmit={handleSubmit}>
          <Input name="email" type="text" label="이메일" />
          <Input name="password" type="password" label="비밀번호" placeholder="12345!@asa" />

          <Button className="w-full" formAction="submit">
            로그인
          </Button>
        </form>

        <div className="flex items-center justify-center">
          <Button
            className="mt-7 w-fit text-center text-gray-500 hover:text-gray-600 active:text-gray-700"
            variant="ghost"
            onClick={() => router.push(PATH.join, { scroll: false })}
          >
            회원가입
          </Button>
        </div>
      </FormProvider>
    </>
  );
};

export default LoginForm;
