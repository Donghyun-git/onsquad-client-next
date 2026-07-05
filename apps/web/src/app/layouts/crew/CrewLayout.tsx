import { CrewDetailAppbar } from '@/features/crew/detail';

import NoTabContentLayout from '../NoTabContentLayout';

async function CrewDetailLayout({ children, params }: { children: React.ReactNode; params: Promise<{ id: string }> }) {
  const { id } = await params;

  const crewId = parseInt(id, 10);

  return (
    <NoTabContentLayout header={<CrewDetailAppbar crewId={crewId} />}>
      <div
        id="no-tab-wrapper"
        className="fixed inset-x-0 top-[var(--app-header-height)] z-0 mx-auto flex h-[calc(100svh-var(--app-header-height))] max-w-[45rem] overflow-y-auto bg-[#f8f8f8]"
      >
        <div className="mx-auto grow p-5">{children}</div>
      </div>
    </NoTabContentLayout>
  );
}

export default CrewDetailLayout;
