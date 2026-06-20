'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { isEmpty } from 'es-toolkit/compat';
import { Loader2 } from 'lucide-react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';

import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/ui/button';

import { changePasswordSchema } from '../model/changePasswordSchema';
import { useChangePasswordMutation } from '../model/useChangePasswordMutation';

const ChangePasswordForm = () => {
  const method = useForm({
    mode: 'onChange',
    resolver: yupResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      newPasswordConfirm: '',
    },
  });

  const {
    handleSubmit: submit,
    getValues,
    control,
    formState: { errors },
  } = method;

  const [currentPassword, newPassword, newPasswordConfirm] = useWatch({
    control,
    name: ['currentPassword', 'newPassword', 'newPasswordConfirm'],
  });

  const { mutateAsync: changePassword, isPending } = useChangePasswordMutation();

  const isEmptyValue = isEmpty(currentPassword) || isEmpty(newPassword) || isEmpty(newPasswordConfirm);

  const isError = errors.currentPassword || errors.newPassword || errors.newPasswordConfirm;

  const handleSubmit = submit(async () => await changePassword(getValues()));

  return (
    <FormProvider {...method}>
      <form className="mt-4 flex flex-col items-center gap-6" onSubmit={handleSubmit}>
        <Input name="currentPassword" type="password" label="현재 비밀번호" placeholder="현재 비밀번호" />

        <Input name="newPassword" type="password" label="새로운 비밀번호" placeholder="새로운 비밀번호" />

        <Input name="newPasswordConfirm" type="password" label="비밀번호 확인" placeholder="비밀번호 확인" />

        <Button
          className="w-full disabled:cursor-not-allowed disabled:bg-grayscale200 disabled:text-grayscale600"
          formAction="submit"
          disabled={isPending || isEmptyValue || isError === undefined ? false : true}
        >
          {isPending ? (
            <div className="flex items-center justify-center gap-1">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              변경 사항을 저장 중이에요 ...
            </div>
          ) : (
            '저장하기'
          )}
        </Button>
      </form>
    </FormProvider>
  );
};

export default ChangePasswordForm;
