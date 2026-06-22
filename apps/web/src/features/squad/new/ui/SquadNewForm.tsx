'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { CircleX, Loader2, X } from 'lucide-react';
import { overlay } from 'overlay-kit';
import { FormProvider, useForm } from 'react-hook-form';

import { AddressSearch } from '@/shared/ui/AddressSearch';

import { crewQueries } from '@/entities/crew';
import { SQUAD_CATEGORIES } from '@/entities/squad';

import { squadCreatePostFetch } from '@/shared/api/squad';
import { TOAST } from '@/shared/config/toast';
import { useToast } from '@/shared/lib/hooks/useToast';
import { closeWithAnimation } from '@/shared/lib/overlay';
import { useApiMutation } from '@/shared/lib/queries/useApiMutation';
import { Accordion } from '@/shared/ui/Accordion';
import { BottomSheet } from '@/shared/ui/BottomSheet';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Textarea } from '@/shared/ui/Textarea';
import { Label } from '@/shared/ui/ui/label';

import { CreateSquadFormValues, createSquadSchema } from './validator';

// 크루 생성 카테고리(Accordion)와 동일한 다중 선택 UI/로직을 쓰기 위해 그룹 구조를 Accordion list 형태로 변환.
const CATEGORY_GROUPS = SQUAD_CATEGORIES.map(({ group, items }) => ({
  title: group,
  value: group,
  tags: items,
}));

const SquadNewForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const crewId = Number(searchParams?.get('crewId'));

  const { toast, hide } = useToast();
  const [displaySpinner, setDisplaySpinner] = useState(false);

  const { mutateAsync: createSquad } = useApiMutation({
    mutationKey: ['@create-squad'],
    fetcher: squadCreatePostFetch,
    invalidateKey: crewQueries.root(),
  });

  const method = useForm<CreateSquadFormValues>({
    resolver: yupResolver(createSquadSchema),
    defaultValues: {
      categories: [],
      address: '',
      addressDetail: '',
      capacity: '',
      title: '',
      content: '',
      kakaoLink: '',
      discordLink: '',
    },
  });

  const {
    watch,
    setValue,
    clearErrors,
    formState: { errors },
    handleSubmit: submit,
  } = method;

  const categories = watch('categories');

  const removeCategory = (target: string) => {
    setValue(
      'categories',
      (categories ?? []).filter((category) => category !== target),
    );
  };

  const handleOpenCategorySheet = () => {
    overlay.open(({ isOpen, close, unmount }) => {
      const handleClose = () => closeWithAnimation(close, unmount);

      return (
        // 오버레이는 폼 트리 밖(portal)이라 Accordion 이 form context 를 읽도록 FormProvider 로 다시 감싼다.
        <FormProvider {...method}>
          <BottomSheet title="카테고리 선택" isOpen={isOpen} onClose={handleClose}>
            <Accordion
              name="categories"
              list={CATEGORY_GROUPS}
              defaultValue={[CATEGORY_GROUPS[0].value]}
              onSubmit={(selected) => setValue('categories', selected)}
              onCancel={handleClose}
            />
          </BottomSheet>
        </FormProvider>
      );
    });
  };

  const handleSubmit = submit(
    async ({ title, content, capacity, address, addressDetail, categories, kakaoLink, discordLink }) => {
      if (!crewId || isNaN(crewId)) {
        toast({
          title: '크루 정보를 찾을 수 없어요.',
          icon: <CircleX onClick={() => hide()} />,
          className: TOAST.error,
        });
        return;
      }

      setDisplaySpinner(true);

      try {
        await createSquad({
          crewId,
          body: {
            title,
            content,
            capacity: Number(capacity),
            address,
            addressDetail,
            categories,
            kakaoLink,
            discordLink,
          },
        });

        toast({
          title: '스쿼드를 생성했어요',
          icon: <CircleX onClick={() => hide()} />,
          className: TOAST.success,
        });

        // 생성 페이지는 히스토리에서 replace 해 뒤로가기로 폼에 돌아오지 않게 한다.
        router.replace(`/crews/${crewId}`);
      } catch (error) {
        console.error(error);
        setDisplaySpinner(false);
      }
    },
  );

  const isCrewIdInvalid = !crewId || isNaN(crewId);

  return (
    <FormProvider {...method}>
      <div className="flex flex-col gap-6">
        {/* 카테고리 선택 */}
        <div className="flex flex-col gap-3">
          <Label className="text-300 leading-130 block font-bold text-grayscale800">카테고리 선택</Label>
          <div className="flex h-10 items-center rounded-lg border border-grayscale100 bg-white px-3 py-2">
            <span className="text-300 leading-130 flex-1 text-grayscale500">모집 카테고리 선택</span>
            <button
              type="button"
              onClick={handleOpenCategorySheet}
              className="text-100 rounded-lg bg-grayscale100 px-3 py-1 font-medium text-grayscale500"
              aria-label="카테고리 선택하기"
            >
              선택하기
            </button>
          </div>
          {categories && categories.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => removeCategory(category)}
                  className="text-100 leading-130 flex items-center gap-2 rounded-full border border-primary700 px-2 py-1 font-medium text-primary700"
                  aria-label={`${category} 삭제`}
                >
                  <span>{category}</span>
                  <X size={12} />
                </button>
              ))}
            </div>
          )}
          {errors?.categories && <p className="mt-1 text-sm text-red-600">{errors.categories.message}</p>}
        </div>

        {/* 지역 선택 */}
        <div className="flex flex-col gap-3">
          <AddressSearch
            name="address"
            onAddressChange={(addr) => {
              setValue('address', addr);
              if (errors?.address) clearErrors('address');
            }}
          />
          <Input name="addressDetail" type="text" label="상세 주소" placeholder="상세 주소를 입력해 주세요." />
        </div>

        {/* 모집 인원 */}
        <Input name="capacity" type="text" extractNumber label="모집 인원" placeholder="모집인원 / ex 6" />

        {/* 제목 */}
        <Input
          name="title"
          type="text"
          label="제목"
          placeholder="모집하는 스쿼드의 제목을 작성해 주세요."
          maxLength={30}
        />

        {/* 내용 */}
        <Textarea name="content" label="내용" placeholder="스쿼드 모집글을 작성해 주세요." />

        {/* 오픈카톡 */}
        <Input name="kakaoLink" type="text" label="오픈카톡" placeholder="카카오톡 오픈채팅 초대 링크를 입력하세요." />

        {/* 디스코드 */}
        <Input name="discordLink" type="text" label="디스코드(선택)" placeholder="디스코드 초대 링크(선택)" />

        {/* 제출 버튼 */}
        <div className="mt-20 pb-12">
          <Button className="w-full" onClick={handleSubmit} disabled={displaySpinner || isCrewIdInvalid}>
            {displaySpinner ? (
              <div className="flex items-center justify-center gap-1">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                스쿼드를 생성하고 있어요
              </div>
            ) : (
              '스쿼드 모집하기'
            )}
          </Button>
        </div>
      </div>
    </FormProvider>
  );
};

export default SquadNewForm;
