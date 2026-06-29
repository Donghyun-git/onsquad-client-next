'use client';

import { useRouter } from 'next/navigation';

import { ChangeEvent, useRef, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { CircleX, ImagePlus, Loader2, X } from 'lucide-react';
import Image from 'next/image';
import { overlay } from 'overlay-kit';
import { FormProvider, useForm } from 'react-hook-form';

import { crewQueries } from '@/entities/crew';
import { addCrewPostFetch } from '@/shared/api/crew/new/addCrewPostFetch';
import { crewCheckGetFetch } from '@/shared/api/crew/new/crewCheckGetFetch';
import { ACCORDION_HASH_TAG_LIST } from '@/shared/config';
import { TOAST } from '@/shared/config/toast';
import { useToast } from '@/shared/lib/hooks/useToast';
import { useApiMutation } from '@/shared/lib/queries/useApiMutation';
import { cn } from '@/shared/lib/utils';
import { Accordion } from '@/shared/ui/Accordion';
import { Badge } from '@/shared/ui/Badge';
import { BottomSheet } from '@/shared/ui/BottomSheet';
import { Input } from '@/shared/ui/Input';
import { InputButton } from '@/shared/ui/InputButton';
import { Textarea } from '@/shared/ui/Textarea';
import { Button } from '@/shared/ui/ui/button';
import { Label } from '@/shared/ui/ui/label';

import { addCrewSchema } from './validator';

/**
 * 크루 개설하기 작성 폼
 */
const AddForm = () => {
  const router = useRouter();

  const { toast, hide } = useToast();

  const [imageUrl, setImageUrl] = useState<string>('');
  const [displaySpinner, setDisplaySpinner] = useState<boolean>(false);
  const [isDuplicate, setIsDuplicate] = useState<boolean>(true);

  const { mutateAsync: addCrew } = useApiMutation({
    fetcher: addCrewPostFetch,
    invalidateKey: crewQueries.lists(),
  });

  const { mutateAsync: checkCrewName } = useApiMutation({
    fetcher: crewCheckGetFetch,
  });

  const fileRef = useRef<HTMLInputElement>(null);

  const method = useForm({
    resolver: yupResolver(addCrewSchema),
    defaultValues: {
      name: '',
      introduce: '',
      detail: '',
      kakaoLink: '',
      file: {} as File,
      hashtags: [],
    },
  });

  const {
    handleSubmit: submit,
    getValues,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = method;

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files = [] } = e.target;

    if (files && files.length > 0) {
      const uploadFile = files[0];

      setValue('file', uploadFile);

      const imageUrl = URL.createObjectURL(uploadFile);

      setImageUrl(imageUrl);
    }
  };

  const handleCrewNameCheck = async () => {
    try {
      if (!(await trigger('name'))) return;

      const { data } = await checkCrewName({
        crewName: getValues('name'),
      });

      const duplicate = data.duplicate;

      if (duplicate) {
        const crewName = getValues('name');

        toast({
          title: `${crewName}은(는) 이미 사용 중이에요.`,
          icon: <CircleX onClick={() => hide()} />,
          className: TOAST.error,
        });

        return;
      }

      setIsDuplicate(false);

      toast({
        title: '멋진 크루 이름이네요!',
        icon: <CircleX onClick={() => hide()} />,
        className: TOAST.success,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = submit(async () => {
    setDisplaySpinner(true);

    try {
      await addCrew({
        ...getValues(),
        file: getValues('file') as File,
      });

      toast({
        title: '크루 생성에 성공했어요.',
        icon: <CircleX onClick={() => hide()} />,
        className: TOAST.success,
      });

      setTimeout(() => {
        // 생성 페이지는 히스토리에서 replace 해 뒤로가기로 폼에 돌아오지 않게 한다.
        router.replace('/');
      }, 1000);
    } catch (error) {
      console.error(error);

      setDisplaySpinner(false);
    }
  });

  return (
    <FormProvider {...method}>
      <div>
        <Input
          name="name"
          type="text"
          placeholder="크루 이름을 지어주세요."
          maxLength={15}
          label="크루명"
          disabled={!isDuplicate}
          button={<InputButton disabled={!isDuplicate} buttonText="중복확인" onClick={handleCrewNameCheck} />}
        />
      </div>

      <div className="mt-6">
        <Textarea name="introduce" label="크루 소개" placeholder="크루 소개글을 작성해주세요." />
      </div>

      <div className="mt-6">
        <Label className="text-grayScale800 mb-2 block font-bold">대표이미지</Label>
        <div className="flex h-40 w-full items-center justify-center rounded-md border border-[#f8f8f8]">
          {watch('file') && imageUrl ? (
            <div
              style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
              }}
              className={cn(`h-full w-full bg-cover bg-center bg-no-repeat object-cover`)}
            >
              <Image
                className="h-full w-full rounded-md object-contain"
                src={imageUrl}
                alt="업로드 이미지"
                width={100}
                height={100}
              />
            </div>
          ) : (
            <Button
              className="text-grayscale500 hover:text-grayscale600 active:text-grayscale700"
              onClick={(e) => {
                e.preventDefault();
                fileRef.current?.click();
              }}
              variant="ghost"
            >
              <div className="flex items-center gap-2">
                <>
                  <ImagePlus size={16} />
                  <span className="inline-block pt-0.5">대표이미지 등록</span>
                </>
              </div>
            </Button>
          )}
        </div>
        {errors?.file && <p className="mt-2 text-left text-sm text-red-600">{errors?.file.message}</p>}
        <input
          type="file"
          ref={fileRef}
          className="hidden"
          accept=".jpeg, .jpg, .png, .svg"
          onChange={handleFileChange}
        />
      </div>

      <div className="mt-6">
        <Textarea name="detail" label="크루 상세정보" placeholder="크루 상세정보를 작성해주세요." />
      </div>

      <div className="mt-6">
        <Input
          name="hashtags"
          type="text"
          placeholder="크루를 나타내는 해시태그를 선택해주세요."
          value=""
          maxLength={15}
          label="크루명"
          button={
            <InputButton
              buttonText="선택하기"
              onClick={() =>
                overlay.open(({ isOpen, close, unmount }) => (
                  <FormProvider {...method}>
                    <BottomSheet
                      title="크루 해시태그"
                      isOpen={isOpen}
                      onClose={() => {
                        close();

                        setTimeout(() => {
                          unmount();
                        }, 300);
                      }}
                    >
                      <Accordion
                        name="hashtags"
                        list={ACCORDION_HASH_TAG_LIST}
                        defaultValue={['hashtag']}
                        onSubmit={(args: string[]) => setValue('hashtags', args)}
                        onCancel={() => {
                          close();

                          setTimeout(() => {
                            unmount();
                          }, 300);
                        }}
                      />
                    </BottomSheet>
                  </FormProvider>
                ))
              }
            />
          }
          disabled
        />
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-1">
        {watch('hashtags')?.map((item, index) => (
          <Badge
            key={index}
            className="flex cursor-pointer gap-1 rounded-xl border border-secondary bg-white text-secondary hover:bg-secondary/10 active:bg-secondary/20"
            onClick={() => {
              const hashtags = getValues('hashtags');

              const filteredHashtags = [...(hashtags ?? [])].filter((tag) => tag !== item);

              setValue('hashtags', filteredHashtags);
            }}
          >
            <span>{item}</span>
            <X className="mb-0.5 text-black" size={12} />
          </Badge>
        ))}
      </div>

      <div className="mt-6">
        <Input type="text" name="kakaoLink" label="크루 소통방" placeholder="크루 소통방 링크를 입력해주세요." />
      </div>

      <div className="buttonArea mt-36 pb-12">
        <Button className="w-full" onClick={handleSubmit} disabled={displaySpinner}>
          {displaySpinner ? (
            <div className="flex items-center justify-center gap-1">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              크루를 생성하고 있어요
            </div>
          ) : (
            '크루 개설'
          )}
        </Button>
      </div>
    </FormProvider>
  );
};

export default AddForm;
