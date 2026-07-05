'use client';

import { ChangeEvent, useRef, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { CircleX, ImagePlus, Loader2, X } from 'lucide-react';
import Image from 'next/image';
import { overlay } from 'overlay-kit';
import { FormProvider, useForm } from 'react-hook-form';

import { crewCheckGetFetch } from '@/entities/crew/api/new/crewCheckGetFetch';

import { addCrewSchema } from '@/features/crew/new/ui/validator';

import { ACCORDION_HASH_TAG_LIST } from '@/shared/config';
import { TOAST } from '@/shared/config/toast';
import { useToast } from '@/shared/lib/hooks/useToast';
import { useApiMutation } from '@/shared/lib/queries/useApiMutation';
import { Accordion } from '@/shared/ui/Accordion';
import { Badge } from '@/shared/ui/Badge';
import { BottomSheet } from '@/shared/ui/BottomSheet';
import { Input } from '@/shared/ui/Input';
import { InputButton } from '@/shared/ui/InputButton';
import { Textarea } from '@/shared/ui/Textarea';
import { Button } from '@/shared/ui/ui/button';
import { Label } from '@/shared/ui/ui/label';

export interface CrewFormValues {
  name: string;
  introduce: string;
  detail: string;
  kakaoLink: string;
  hashtags: string[];
}

export interface CrewFormSubmitMeta {
  file?: File;
  removeImage?: boolean;
}

interface CrewFormProps {
  mode: 'add' | 'edit';
  defaultValues?: CrewFormValues;
  initialImageUrl?: string;
  submitting: boolean;
  onSubmit: (values: CrewFormValues, meta: CrewFormSubmitMeta) => Promise<void>;
}

/**
 * 크루 개설/수정 공통 폼
 */
const CrewForm = ({ mode, defaultValues, initialImageUrl, submitting, onSubmit }: CrewFormProps) => {
  const { toast, hide } = useToast();

  const [previewUrl, setPreviewUrl] = useState<string>(initialImageUrl ?? '');
  const [isImageRemoved, setIsImageRemoved] = useState<boolean>(false);
  const [isDuplicate, setIsDuplicate] = useState<boolean>(mode === 'add');

  const { mutateAsync: checkCrewName } = useApiMutation({
    fetcher: crewCheckGetFetch,
  });

  const fileRef = useRef<HTMLInputElement>(null);

  const method = useForm({
    resolver: yupResolver(addCrewSchema),
    defaultValues: {
      name: defaultValues?.name ?? '',
      introduce: defaultValues?.introduce ?? '',
      detail: defaultValues?.detail ?? '',
      kakaoLink: defaultValues?.kakaoLink ?? '',
      file: {} as File,
      hashtags: defaultValues?.hashtags ?? [],
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

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files && files.length > 0) {
      const uploadFile = files[0];

      setValue('file', uploadFile);
      setPreviewUrl(URL.createObjectURL(uploadFile));
      setIsImageRemoved(false);
    }
  };

  const handleRemoveImage = () => {
    setValue('file', {} as File);
    setPreviewUrl('');
    setIsImageRemoved(true);

    if (fileRef.current) {
      fileRef.current.value = '';
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
    const values = getValues();
    const file = values.file;
    const hasFile = file instanceof File;

    await onSubmit(
      {
        name: values.name,
        introduce: values.introduce,
        detail: values.detail,
        kakaoLink: values.kakaoLink,
        hashtags: values.hashtags,
      },
      {
        file: hasFile ? file : undefined,
        removeImage: mode === 'edit' ? isImageRemoved && !hasFile : undefined,
      },
    );
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
          disabled={mode === 'edit' ? false : !isDuplicate}
          button={
            mode === 'add' ? (
              <InputButton disabled={!isDuplicate} buttonText="중복확인" onClick={handleCrewNameCheck} />
            ) : undefined
          }
        />
      </div>

      <div className="mt-6">
        <Textarea name="introduce" label="크루 소개" placeholder="크루 소개글을 작성해주세요." />
      </div>

      <div className="mt-6">
        <Label className="text-grayScale800 mb-2 block font-bold">대표이미지</Label>
        <div className="relative flex h-[120px] w-full items-center justify-center overflow-hidden rounded-lg border border-[#f8f8f8] bg-white">
          {previewUrl ? (
            <>
              <Image className="object-cover" src={previewUrl} alt="대표 이미지" fill />
              <button
                type="button"
                aria-label="이미지 삭제"
                onClick={(e) => {
                  e.preventDefault();
                  handleRemoveImage();
                }}
                className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-grayscale900 shadow"
              >
                <X size={14} />
              </button>
            </>
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
                <ImagePlus size={16} />
                <span className="inline-block pt-0.5">대표이미지 등록</span>
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
          placeholder="크루를 나타내는 태그를 작성해 보세요."
          value=""
          maxLength={15}
          label="해시태그"
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
        <Input type="text" name="kakaoLink" label="오픈카톡" placeholder="크루 소통방 링크를 입력해주세요." />
      </div>

      <div className="buttonArea mt-36 pb-12">
        <Button className="w-full" onClick={handleSubmit} disabled={submitting}>
          {submitting ? (
            <div className="flex items-center justify-center gap-1">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {mode === 'add' ? '크루를 생성하고 있어요' : '저장하고 있어요'}
            </div>
          ) : mode === 'add' ? (
            '크루 개설'
          ) : (
            '저장하기'
          )}
        </Button>
      </div>
    </FormProvider>
  );
};

export default CrewForm;
