import { SquadJoinPage } from '@/pages/squads/join';
import { NoTabContentLayout } from '@/app/layouts';
import { Appbar } from '@/shared/ui/Appbar';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return (
    <NoTabContentLayout header={<Appbar title="합류신청" />}>
      <SquadJoinPage />
    </NoTabContentLayout>
  );
}
