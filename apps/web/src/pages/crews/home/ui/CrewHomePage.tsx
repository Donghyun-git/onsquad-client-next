import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

import { CrewHome } from '@/features/crew/home';

import { crewQueries } from '@/entities/crew/api/crew.queries';

import type { CrewHomeInfoResponseProps } from '@/shared/api/crew';
import { getQueryClient } from '@/shared/lib/queries';
import { getServerAccessToken } from '@/shared/lib/queries/getServerAccessToken';
import { Appbar } from '@/shared/ui/Appbar';

const getHomeData = async (
  queryClient: QueryClient,
  crewId: number,
  page?: number,
  size?: number,
  accessToken?: string,
) => {
  await queryClient.fetchQuery(
    crewQueries.home({
      crewId,
      page,
      size,
      accessToken,
    }),
  );
};

async function CrewHomePage({
  params,
  // searchParams,
}: {
  params: { id: string };
  searchParams: { page?: string; size?: string };
}) {
  const { id } = await params;

  //TODO: 스쿼드리스트 페이징 구현
  // const { page, size } = await searchParams;

  const crewId = parseInt(id, 10);
  const pageNum = 1;
  const sizeNum = 10;

  const queryClient = getQueryClient();

  const accessToken = await getServerAccessToken();

  await getHomeData(queryClient, crewId, pageNum, sizeNum, accessToken);

  const crewData = queryClient.getQueryData<CrewHomeInfoResponseProps>(
    crewQueries.home({ crewId, page: pageNum, size: sizeNum }).queryKey,
  );

  const appBarTitle = crewData?.data?.crew?.name;
  const crewHomeData = crewData?.data;

  return (
    <>
      <Appbar isMenuHeader={false} title={appBarTitle} />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CrewHome data={crewHomeData} />
      </HydrationBoundary>
    </>
  );
}

export default CrewHomePage;
