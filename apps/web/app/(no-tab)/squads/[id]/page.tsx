import { SquadDetailPage } from '@/pages/squads/detail';
import { NoTabContentLayout } from '@/app/layouts';
import { SquadDetailAppbar } from '@/features/squad/detail';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return (
    <NoTabContentLayout header={<SquadDetailAppbar squadId={Number(id)} />}>
      <SquadDetailPage id={id} />
    </NoTabContentLayout>
  );
}
