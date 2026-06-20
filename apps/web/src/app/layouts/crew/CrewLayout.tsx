import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import type { CrewDetailData } from '@/entities/crew';
import { crewQueries } from '@/entities/crew/api/crew.queries';

import { getQueryClient } from '@/shared/lib/queries';
import { Appbar } from '@/shared/ui/Appbar';

import NoTabContentLayout from '../NoTabContentLayout';

async function CrewDetailLayout({ children, params }: { children: React.ReactNode; params: { id: string } }) {
  const { id } = await params;

  const crewId = parseInt(id, 10);

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(crewQueries.detail({ crewId }));

  const crewDetailData = queryClient.getQueryData<CrewDetailData>(crewQueries.detail({ crewId }).queryKey);

  const appBarTitle = crewDetailData?.name;

  return (
    <NoTabContentLayout header={<Appbar isMenuHeader={false} title={appBarTitle} />}>
      <div
        id="no-tab-wrapper"
        className="fixed inset-x-0 top-[var(--app-header-height)] z-0 mx-auto flex h-[calc(100svh-var(--app-header-height))] max-w-[45rem] overflow-y-auto bg-[#f8f8f8]"
      >
        <div className="mx-auto grow p-5">
          <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>
        </div>
      </div>
    </NoTabContentLayout>
  );
}

export default CrewDetailLayout;
