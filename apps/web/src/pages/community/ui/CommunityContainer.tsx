'use client';

import { useEffect, useMemo, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { debounce } from 'es-toolkit';
import { Loader2 } from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';
import { useInView } from 'react-intersection-observer';

import { crewQueries } from '@/entities/crew/api/crew.queries';

import { cn } from '@/shared/lib';
import { searchSchema } from '@/shared/ui/Searchbar/validator';
import { Skeleton } from '@/shared/ui/Skeleton';
import { Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/ui/button';

import CrewList from './CommunityCrewList';
import Search from './CommunitySearchbar';

const CommunityContainer = () => {
  // 전역 throwOnError(true) 를 이 페이지에서만 해제: 에러를 ErrorBoundary 로 던지지 않고
  // 인라인 재시도 UI 로 graceful 하게 처리한다.
  const { data: crewList } = useQuery({ ...crewQueries.list(), throwOnError: false });

  const method = useForm({
    resolver: yupResolver(searchSchema),
    values: {
      search: '',
    },
  });

  const { watch } = method;
  const searchValue = watch('search');

  const [debouncedSearchValue, setDebouncedSearchValue] = useState<string>('');
  const [isScrollLoading, setIsScrollLoading] = useState<boolean>(false);

  const debouncedSetSearch = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedSearchValue(value);
      }, 500),
    [],
  );

  useEffect(() => {
    debouncedSetSearch(searchValue);
  }, [searchValue, debouncedSetSearch]);

  const { ref, inView } = useInView();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isLoading: isListLoading,
    refetch,
  } = useInfiniteQuery({
    ...crewQueries.infiniteList({
      crewName: debouncedSearchValue,
    }),
    throwOnError: false,
    initialData:
      !debouncedSearchValue && crewList
        ? {
            pages: [
              {
                data: crewList,
                nextPage: crewList.results.length === 10 ? 2 : undefined,
              },
            ],
            pageParams: [1],
          }
        : undefined,
  });

  const combinedList = data?.pages.flatMap((page) => page.data.results) ?? [];

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      if (!hasNextPage) {
        setIsScrollLoading(false);
      } else {
        setIsScrollLoading(true);

        const fetchTimer = setTimeout(async () => {
          await fetchNextPage();
          setIsScrollLoading(false);
        }, 1000);

        return () => clearTimeout(fetchTimer);
      }
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <FormProvider {...method}>
      <div className="-mx-5 -mt-6 min-h-40 bg-[#d9d9d9]">
        <div className="flex min-h-56 items-end justify-center bg-[url('/images/search_banner.svg')] bg-cover bg-center bg-no-repeat">
          <div className="mx-auto w-2/3 pb-4 pt-6 S2:w-full SE:w-full SE:px-2 mobile:w-full mobile:px-2">
            <Search />
          </div>
        </div>
      </div>
      <div className={cn('relative mt-7 pb-5', isScrollLoading && 'pb-14')}>
        <Text.lg className="font-semibold">
          <h3>모집중인 크루</h3>
        </Text.lg>
        {isError ? (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <Text.sm className="text-[#909090]">크루 목록을 불러오지 못했어요.</Text.sm>
            <Button
              variant="ghost"
              className="h-fit p-2 font-semibold text-[#6C6C6C] hover:text-[#464646]"
              onClick={() => refetch()}
            >
              다시 시도
            </Button>
          </div>
        ) : isListLoading ? (
          <Skeleton.CrewList className="pt-6" />
        ) : (
          <CrewList list={combinedList ?? []} />
        )}

        {combinedList.length > 0 && hasNextPage && (
          <div
            ref={ref}
            className="absolute bottom-[26px] left-1/2 col-span-full flex h-10 -translate-x-1/2 justify-center"
          >
            <Loader2 className="mt-6 h-6 w-6 animate-spin text-primary" />
            {!isScrollLoading && <Loader2 className="mt-6 h-6 w-6 animate-spin text-primary" />}
          </div>
        )}
      </div>
    </FormProvider>
  );
};

export default CommunityContainer;
