'use client';

import { useState } from 'react';

import { overlay } from 'overlay-kit';

import { cn } from '@/shared/lib/utils';
import { BottomSheet } from '@/shared/ui/BottomSheet';
import { Label } from '@/shared/ui/ui/label';
import { FormProvider, useForm } from 'react-hook-form';

import SquadCategorySelect from './SquadCategorySelect';

interface SquadNewFormValues {
  category: string;
  location: string;
  locationDetail: string;
  maxMembers: string;
  title: string;
  content: string;
  openChatUrl: string;
}

const SquadNewForm = () => {
  const [selectedCategory, setSelectedCategory] = useState('');

  const method = useForm<SquadNewFormValues>({
    defaultValues: {
      category: '',
      location: '',
      locationDetail: '',
      maxMembers: '',
      title: '',
      content: '',
      openChatUrl: '',
    },
  });

  const { watch, setValue } = method;
  const category = watch('category') || selectedCategory;

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    setValue('category', cat);
  };

  const handleOpenCategorySheet = () => {
    overlay.open(({ isOpen, close, unmount }) => (
      <BottomSheet
        title="카테고리 선택"
        isOpen={isOpen}
        onClose={() => {
          close();
          setTimeout(() => unmount(), 300);
        }}
      >
        <SquadCategorySelect
          value={selectedCategory}
          onChange={(cat) => {
            handleCategorySelect(cat);
            close();
            setTimeout(() => unmount(), 300);
          }}
        />
      </BottomSheet>
    ));
  };

  const handleSubmit = method.handleSubmit(() => {
    // TODO: API 연동
  });

  return (
    <FormProvider {...method}>
      <div className="flex flex-col gap-6">
        {/* 카테고리 선택 */}
        <div className="flex flex-col gap-3">
          <Label className="text-grayscale800 block font-bold text-300 leading-130">카테고리 선택</Label>
          <div className="flex h-10 items-center rounded-lg border border-grayscale100 bg-white px-3 py-2">
            <span className={cn('flex-1 text-300 leading-130', category ? 'text-grayscale900' : 'text-grayscale500')}>
              {category || '모집 카테고리 선택'}
            </span>
            <button
              type="button"
              onClick={handleOpenCategorySheet}
              className="rounded-lg bg-grayscale100 px-3 py-1 text-100 font-medium text-grayscale500"
              aria-label="카테고리 선택하기"
            >
              선택하기
            </button>
          </div>
        </div>

        {/* 지역 선택 */}
        <div className="flex flex-col gap-3">
          <Label className="text-grayscale800 block font-bold text-300 leading-130">지역 선택</Label>
          <div className="flex h-10 items-center rounded-lg border border-grayscale100 bg-white px-3 py-2">
            <span className="flex-1 text-300 leading-130 text-grayscale500">주소를 검색해 주세요.</span>
            <button
              type="button"
              className="rounded-lg bg-grayscale100 px-3 py-1 text-100 font-medium text-grayscale500"
              aria-label="주소 검색"
            >
              주소 검색
            </button>
          </div>
          <div className="flex h-10 items-center rounded-lg border border-grayscale100 bg-white px-3 py-2">
            <span className="text-300 leading-130 text-grayscale900">대전광역시 동구 대전로 935</span>
          </div>
        </div>

        {/* 모집 인원 */}
        <div className="flex flex-col gap-3">
          <Label className="text-grayscale800 block font-bold text-300 leading-130">모집 인원</Label>
          <div className="flex h-10 items-center rounded-lg border border-grayscale100 bg-white px-3 py-2">
            <span className="text-300 leading-130 text-grayscale500">모집인원 / ex 6</span>
          </div>
        </div>

        {/* 제목 */}
        <div className="flex flex-col gap-3">
          <Label className="text-grayscale800 block font-bold text-300 leading-130">제목</Label>
          <div className="flex h-10 items-center rounded-lg border border-grayscale100 bg-white px-3 py-2">
            <span className="text-300 leading-130 text-grayscale500">모집하는 스쿼드의 제목을 작성해 주세요.</span>
          </div>
        </div>

        {/* 내용 */}
        <div className="flex flex-col gap-3">
          <Label className="text-grayscale800 block font-bold text-300 leading-130">내용</Label>
          <div className="flex min-h-[88px] items-start rounded-lg border border-grayscale100 bg-white px-3 pb-14 pt-2">
            <span className="text-300 leading-130 text-grayscale500">스쿼드 모집글을 작성해 주세요.</span>
          </div>
        </div>

        {/* 오픈카톡 */}
        <div className="flex flex-col gap-3">
          <Label className="text-grayscale800 block font-bold text-300 leading-130">오픈카톡</Label>
          <div className="flex h-10 items-center rounded-lg border border-grayscale100 bg-white px-3 py-2">
            <span className="text-300 leading-130 text-grayscale500">카카오톡 오픈채팅 초대 링크를 입력하세요.</span>
          </div>
        </div>

        {/* 제출 버튼 */}
        <div className="mt-20 pb-12">
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full rounded-lg bg-grayscale100 p-3 text-center text-300 font-medium text-grayscale500"
          >
            스쿼드 모집하기
          </button>
        </div>
      </div>
    </FormProvider>
  );
};

export default SquadNewForm;
