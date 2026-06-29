import type { Metadata } from 'next';
import { SquadDetailPage } from '@/pages/squads/detail';
import { NoTabContentLayout } from '@/app/layouts';
import { SquadDetailAppbar } from '@/features/squad/detail';

export const metadata: Metadata = { title: '스쿼드 | OnSquad' };

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
