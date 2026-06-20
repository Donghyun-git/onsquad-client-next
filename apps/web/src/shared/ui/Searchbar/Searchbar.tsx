'use client';

import React from 'react';

import { Search } from 'lucide-react';
import { FormProvider, useFormContext } from 'react-hook-form';

import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/ui/button';

import { Input } from '../Input';

interface SearchbarPropsType {
  className?: string;
}

/**
 * react-hook-form의 method를 props로 받는 검색 공통 컴포넌트
 */
const Searchbar = (props: SearchbarPropsType) => {
  const { className } = props;

  const method = useFormContext();

  return (
    <FormProvider {...method}>
      <form>
        <div className="relative">
          <Input className={cn(`pr-10 ${className}`)} name="search" type="text" placeholder="크루를 검색해보세요." />
          <div className="absolute right-1 top-1">
            <Button className="m-1 mx-1 h-fit px-1 py-1 active:bg-gray-200" variant="ghost" formAction="submit">
              <Search stroke="#8c8c8c" size={16} />
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default Searchbar;
