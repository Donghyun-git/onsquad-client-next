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

import CrewList from './CommunityCrewList';
import Search from './CommunitySearchbar';

const CommunityContainer = () => {
  const { data: crewList, isLoading } = useQuery(crewQueries.list());

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

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    ...crewQueries.infiniteList({
      crewName: debouncedSearchValue,
    }),
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
        {isLoading ? <Skeleton.CrewList /> : <CrewList list={combinedList ?? []} />}

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
