import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import Image from 'next/image';

import { CrewList } from '@/widgets/CrewList';
import { MainDashboard } from '@/widgets/MainDashboard';

// import { SearchContainer } from '@/widgets/SearchContainer';

import type { CrewListData } from '@/entities/crew';
import { crewQueries } from '@/entities/crew/api/crew.queries';

import { getQueryClient } from '@/shared/lib/queries/get-query-client';
import { Text } from '@/shared/ui/Text';

export const revalidate = 3600;

async function HomePage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(crewQueries.list());

  const crewListData = queryClient.getQueryData<CrewListData>(crewQueries.list().queryKey);

  return (
    <div className="h-full w-full bg-gray-50">
      <div className="flex w-full items-center justify-between rounded-xl bg-[#144A7D] p-9 ease-linear S2:flex-col SE:flex-col mobile:flex-col tablet:flex-col">
        <Image
          src="/images/main_banner.svg"
          width={220}
          height={110}
          className="hidden h-auto w-auto S2:mb-12 S2:inline-block SE:mb-12 SE:inline-block mobile:mb-12 mobile:inline-block tablet:mb-12 tablet:inline-block"
          alt="온스쿼드 배너"
          priority={true}
        />
        <div className="font-semibold text-white">
          <Text.lg className="mb-1 S2:text-sm">모임이 좋았을 뿐인데,,,</Text.lg>
          <Text.xxl className="mb-2">
            <h2 className="flex items-center S2:text-xs">
              점점 <Text.xxxl className="ml-1 font-extrabold S2:text-xl">부담</Text.xxxl>이 되고 있다면?
            </h2>
          </Text.xxl>
          <div className="flex flex-col gap-3 mobile:flex-row tablet:flex-row">
            <Image
              src="/icons/onsquad_logo.svg"
              alt="온스쿼드 로고"
              className="h-auto w-auto"
              width={150}
              height={50}
            />
            <Text.lg>에 합류하세요!</Text.lg>
          </div>
        </div>
        <Image
          src="/images/main_banner.svg"
          width={220}
          height={110}
          className="h-auto w-auto S2:hidden SE:hidden mobile:hidden tablet:hidden"
          alt="온스쿼드 배너"
          priority={true}
        />
      </div>

      <div className="mt-6" />
      <section className="flex w-full items-center justify-center gap-4 S2:flex-col SE:flex-col mobile:flex-col tablet:flex-col">
        <MainDashboard />
      </section>
      <section>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <CrewList list={crewListData?.results ?? []} />
        </HydrationBoundary>
      </section>
    </div>
  );
}

export default HomePage;
