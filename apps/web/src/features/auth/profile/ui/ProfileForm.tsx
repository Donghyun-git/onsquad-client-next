'use client';

import { useRouter } from 'next/navigation';

import { ChangeEvent, useEffect, useRef, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Camera, CircleCheck, CircleX, Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { overlay } from 'overlay-kit';
import { FormProvider, useForm } from 'react-hook-form';

import { AddressSearch } from '@/shared/ui/AddressSearch';

import { nicknameCheckGetFetch } from '@/shared/api/user/nicknameCheckGetFetch';
import { MBTI_SELECT_OPTIONS } from '@/shared/config';
import { TOAST } from '@/shared/config/toast';
import { useToast, useUser } from '@/shared/lib/hooks';
import { useApiMutation } from '@/shared/lib/queries';
import { cn } from '@/shared/lib/utils';
import { Alert } from '@/shared/ui/Alert';
import { BUTTON } from '@/shared/ui/Alert/style';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { InputButton } from '@/shared/ui/InputButton';
import { Select } from '@/shared/ui/Select';
import { Spinner } from '@/shared/ui/Spinner';
import { Textarea } from '@/shared/ui/Textarea';

import { getUpdateProfileCleansingData } from '../lib/getUpdateProfileCleansingData';
import { profileSchema } from '../model/profileSchema';
import { useProfileUpdateMutation } from '../model/useProfileUpdateMutation';

/**
 * 프로필 페이지
 */
const ProfileForm = () => {
  const { update } = useSession();

  const { toast } = useToast();

  const router = useRouter();

  const user = useUser();

  const [imageUrl, setImageUrl] = useState<string>('/icons/default_profile.svg');
  // const [isDuplicate, setIsDuplicate] = useState<boolean>(true);

  const fileRef = useRef<HTMLInputElement>(null);

  const method = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      nickname: '',
      introduce: '',
      kakaoLink: '',
      profileImage: '/icons/default_profile.svg',
      mbti: '',
      address: '',
      addressDetail: '',
    },
  });

  const {
    handleSubmit: submit,
    getValues,
    // watch,
    setValue,
    clearErrors,
    trigger,
    reset,
    formState: { errors },
  } = method;

  const { mutateAsync: updateProfileMutate, isPending: isUpdateProfilePending } = useProfileUpdateMutation();

  const { mutateAsync: nicknameCheck } = useApiMutation({
    mutationKey: ['@nickname-check'],
    fetcher: nicknameCheckGetFetch,
    options: {
      onSuccess: (data) => {
        if (!data.data.duplicate) {
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

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files = [] } = e.target;

    if (files && files.length > 0) {
      const uploadFile = files[0];

      setValue('profileImage', uploadFile);

      const imageUrl = URL.createObjectURL(uploadFile);

      setImageUrl(imageUrl);
    }
  };

  const handleSubmit = submit(async () => {
    try {
      const formValues = {
        ...getValues(),
        mbti: getValues('mbti') ?? '',
      };

      await updateProfileMutate(getUpdateProfileCleansingData(formValues));

      await update({ trigger: 'update' });

      toast({
        title: '프로필이 수정되었어요!',
        className: TOAST.success,
        icon: <CircleCheck />,
      });

      router.back();
    } catch (error) {
      console.error(error);
    }
  });

  useEffect(() => {
    if (user) {
      reset({
        nickname: user.nickname,
        introduce: user.introduce,
        profileImage: user.profileImage || '/icons/default_profile.svg',
        mbti: user.mbti,
        address: user.address,
        addressDetail: user.addressDetail,
        kakaoLink: user.kakaoLink ?? '',
      });
    }
  }, [user]);

  // const profileImage = watch('profileImage');

  if (!user) {
    return overlay.open(({ isOpen }) => (
      <Alert
        isOpen={isOpen}
        title="알림"
        headerClassName="pt-6"
        buttonSlot={
          <div className="w-full">
            <Button className={cn(BUTTON.ACTION, 'w-full rounded-bl-md')} onClick={() => router.back()}>
              확인
            </Button>
          </div>
        }
      >
        로그인 후 이용해주세요!
      </Alert>
    ));
  }

  if (!user) {
    return (
      <div className="container flex h-screen items-center justify-center bg-grayscale100 pt-6">
        <Spinner />
      </div>
    );
  }

  return (
    <FormProvider {...method}>
      <div className="bg-grayscale100">
        <div className="mb-12 flex w-full items-center justify-center gap-2">
          <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl border border-[#f8f8f8]">
            <div
              className={cn(`h-full w-full cursor-pointer overflow-hidden rounded-3xl object-cover`)}
              onClick={() => {
                fileRef.current?.click();
              }}
            >
              <Image
                src={imageUrl}
                alt="profile"
                className="h-full w-full rounded-full object-cover"
                fill
                sizes="100%"
                priority
              />
              <div className="absolute bottom-0 right-0 flex items-center gap-2 rounded-full border border-grayscale300 bg-white p-1">
                <Camera size={12} stroke="#909090" />
              </div>
            </div>
          </div>
        </div>

        <input
          type="file"
          ref={fileRef}
          className="hidden"
          accept=".jpeg, .jpg, .png, .svg"
          onChange={handleFileChange}
        />

        <div>
          <Input
            name="nickname"
            type="text"
            label="닉네임"
            maxLength={8}
            placeholder={user?.nickname}
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
        </div>

        <div className="mt-6">
          <Textarea name="introduce" label="나의 소개" placeholder="나의 소개글을 작성해주세요." />
        </div>

        <div className="mt-6">
          <Select name="mbti" label="MBTI" options={MBTI_SELECT_OPTIONS} />
        </div>

        <div className="mt-6">
          <Input
            type="text"
            className="w-full"
            name="kakaoLink"
            label="오픈 카톡 프로필"
            placeholder="오픈 카톡 프로필 링크를 입력해주세요."
          />
        </div>

        <div className="mt-6 flex w-full flex-col items-center gap-2">
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
        <div className="mt-36 h-full pb-12">
          <Button className="w-full" onClick={handleSubmit} isLoading={isUpdateProfilePending}>
            {isUpdateProfilePending ? (
              <div className="flex items-center justify-center gap-1">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                프로필을 수정하고 있어요
              </div>
            ) : (
              '프로필 수정'
            )}
          </Button>
        </div>
      </div>
    </FormProvider>
  );
};

export default ProfileForm;
