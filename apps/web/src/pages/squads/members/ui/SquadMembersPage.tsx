import { NoTabContentLayout } from '@/app/layouts';

import { SquadMembers } from '@/features/squad/members';

import { Appbar } from '@/shared/ui/Appbar';

interface SquadMembersPageProps {
  params: Promise<{ id: string }>;
}

const SquadMembersPage = async ({ params }: SquadMembersPageProps) => {
  const { id } = await params;

  return (
    <NoTabContentLayout header={<Appbar title="스쿼드원" />}>
      <SquadMembers squadId={Number(id)} />
    </NoTabContentLayout>
  );
};

export default SquadMembersPage;
