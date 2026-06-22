import { SquadMembersPage } from '@/pages/squads/members';
import { NoTabContentLayout } from '@/app/layouts';
import { Appbar } from '@/shared/ui/Appbar';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return (
    <NoTabContentLayout header={<Appbar isMenuHeader={false} title="스쿼드원" />}>
      <SquadMembersPage squadId={Number(id)} />
    </NoTabContentLayout>
  );
}
