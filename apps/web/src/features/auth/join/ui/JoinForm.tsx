'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { yupResolver } from '@hookform/resolvers/yup';
import { CircleCheck, CircleX, Loader2 } from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';

import { authCodeCheckGetFetch } from '@/shared/api/user/authCodeCheckGetFetch';
import { nicknameCheckGetFetch } from '@/shared/api/user/nicknameCheckGetFetch';
import { sendEmailAuthCodePostFetch } from '@/shared/api/user/sendEmailAuthCodePostFetch';
import { userEmailCheckGetFetch } from '@/shared/api/user/userEmailCheckGetFetch';
import { userJoinPostFetch } from '@/shared/api/user/userJoinPostFetch';
import { PATH } from '@/shared/config/paths';
import { TOAST } from '@/shared/config/toast';
import { useToast } from '@/shared/lib/hooks/useToast';
import { useApiMutation } from '@/shared/lib/queries/useApiMutation';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { InputButton } from '@/shared/ui/InputButton';

import AddressSearch from './AddressSearch';
import { joinSchema } from './validator';

const JoinForm = () => {
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [isEmailAuth, setIsEmailAuth] = useState<boolean>(false);
  const [isEmailAuthSuccess, setIsEmailAuthSuccess] = useState<boolean>(false);
  const [isNicknameValid, setIsNicknameValid] = useState<boolean>(false);

  const { toast } = useToast();
  const router = useRouter();

  const { mutateAsync: userJoin, isPending: isUserJoinPending } = useApiMutation({
    fetcher: userJoinPostFetch,
    options: {
      onSuccess: (data) => {
        if (data.status === 201) {
          toast({
            title: '회원가입에 성공했어요.',
            className: TOAST.success,
            icon: <CircleCheck />,
          });

          router.push(PATH.login, { scroll: false });
        } else {
          toast({
            title: '회원가입에 실패했어요.',
            className: TOAST.error,
            icon: <CircleX />,
          });
        }
      },
    },
  });

  const { mutateAsync: nicknameCheck } = useApiMutation({
    mutationKey: ['@nickname-check'],
    fetcher: nicknameCheckGetFetch,
    options: {
      onSuccess: (data) => {
        if (!data.data.duplicate) {
          setIsNicknameValid(true);

          toast({
            title: '사용 가능한 닉네임 이에요!',
            className: TOAST.success,
            icon: <CircleCheck />,
          });
        } else {
          toast({
            title: '이미 사용 중인 닉네임이에요.',
            className: TOAST.error,
            icon: <CircleX />,
          });
        }
      },
    },
  });

  const { mutateAsync: emailCheck } = useApiMutation({
    mutationKey: ['@email-check'],
    fetcher: userEmailCheckGetFetch,
    options: {
      onSuccess: (data) => {
        if (!data.data.duplicate) {
          setIsEmailValid(true);

          toast({
            title: '사용 가능한 이메일 이에요!',
            className: TOAST.success,
            icon: <CircleCheck />,
          });
        } else {
          toast({
            title: '이미 사용 중인 이메일이에요.',
            className: TOAST.error,
            icon: <CircleX />,
          });
        }
      },
    },
  });

  const { mutateAsync: sendEmailAuthCode } = useApiMutation({
    mutationKey: ['@send-email-auth-code'],
    fetcher: sendEmailAuthCodePostFetch,
    options: {
      onSuccess: (data) => {
        if (data.status === 201) {
          setIsEmailAuth(true);

          toast({
            title: `${getValues('email')}로 인증번호를 전송했어요.`,
            className: TOAST.success,
            icon: <CircleCheck />,
          });
        } else {
          toast({
            title: '인증번호 전송에 실패했어요.',
            className: TOAST.error,
            icon: <CircleX />,
          });
        }
      },
    },
  });

  const { mutateAsync: authCodeCheck } = useApiMutation({
    mutationKey: ['@auth-code-check'],
    fetcher: authCodeCheckGetFetch,
    options: {
      onSuccess: (data) => {
        if (data.data.valid) {
          setIsEmailAuthSuccess(true);

          toast({
            title: '인증번호 확인에 성공했어요.',
            className: TOAST.success,
            icon: <CircleCheck />,
          });
        } else {
          toast({
            title: '인증번호 확인에 실패했어요.',
            className: TOAST.error,
            icon: <CircleX />,
          });
        }
      },
    },
  });

  const method = useForm({
    mode: 'onChange',
    resolver: yupResolver(joinSchema),
    values: {
      email: '',
      authCode: '',
      password: '',
      passwordConfirm: '',
      nickname: '',
      address: '',
      addressDetail: '',
    },
  });

  const {
    handleSubmit: submit,
    setValue,
    getValues,
    trigger,
    formState: { errors },
    clearErrors,
  } = method;

  const handleSubmit = submit(async () => {
    try {
      await userJoin({
        ...getValues(),
      });
    } catch (error) {
      console.error(error);
    }
  });

  const handleEmailCheck = async () => {
    try {
      await emailCheck({ email: getValues('email') });
    } catch (error) {
      console.error(error);
    }
  };

  const handleAuthCodeSend = async () => {
    try {
      await sendEmailAuthCode({
        email: getValues('email'),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const isDisabled = !(isEmailValid && isNicknameValid && isEmailAuth && isEmailAuthSuccess);

  return (
    <FormProvider {...method}>
      <form className="mt-4 flex flex-col items-center gap-6 pb-8" onSubmit={handleSubmit}>
        <div className="flex w-full flex-col items-center gap-2">
          <Input
            name="email"
            type="text"
            label="이메일"
            placeholder="onsquad@onsquad.co.kr"
            disabled={isEmailValid}
            button={
              <>
                {!isEmailValid ? (
                  <InputButton
                    buttonText="중복확인"
                    onClick={async () => {
                      if (!(await trigger('email'))) return;

                      handleEmailCheck();
                    }}
                  />
                ) : !isEmailAuth || !isEmailAuthSuccess ? (
                  <InputButton buttonText={isEmailAuth ? '재전송하기' : '이메일 인증'} onClick={handleAuthCodeSend} />
                ) : null}
              </>
            }
          />
          {isEmailAuth ? (
            <Input
              name="authCode"
              type="text"
              placeholder="인증번호 8자리"
              disabled={isEmailAuthSuccess}
              button={
                <InputButton
                  buttonText={isEmailAuthSuccess ? '인증완료' : '인증번호 확인'}
                  disabled={isEmailAuthSuccess}
                  onClick={async () => {
                    if (!(await trigger('authCode'))) return;

                    authCodeCheck({
                      email: getValues('email'),
                      authCode: getValues('authCode'),
                    });
                  }}
                />
              }
            />
          ) : null}
        </div>

        <Input name="password" type="password" label="비밀번호" placeholder="영문, 숫자, 특수문자 1자를 포함" />

        <Input
          name="passwordConfirm"
          type="password"
          label="비밀번호 확인"
          placeholder="영문, 숫자, 특수문자 1자를 포함"
        />

        <Input
          name="nickname"
          type="text"
          label="닉네임"
          maxLength={8}
          placeholder="홍길동"
          button={
            <InputButton
              buttonText="중복확인"
              onClick={async () => {
                if (!(await trigger('nickname'))) return;

                nicknameCheck({ nickname: getValues('nickname') });
              }}
            />
          }
        />

        <div className="flex w-full flex-col items-center gap-2">
          <AddressSearch
            name="address"
            onAddressChange={(addr) => {
              setValue('address', addr);

              if (errors?.address) {
                clearErrors('address');

                return;
              }
            }}
          />
          <Input name="addressDetail" type="text" />
        </div>

        <Button className="w-full" formAction="submit" disabled={isUserJoinPending || isDisabled}>
          {isUserJoinPending ? (
            <div className="flex items-center justify-center gap-1">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              회원가입 중이에요 ...
            </div>
          ) : (
            '회원가입'
          )}
        </Button>
      </form>
    </FormProvider>
  );
};

export default JoinForm;
