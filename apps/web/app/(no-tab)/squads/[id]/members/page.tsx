import { MOCK_SQUAD } from '@/entities/squad';
import { SquadMembersPage } from '@/pages/squads/members';
import { NoTabContentLayout } from '@/app/layouts';
import { Appbar } from '@/shared/ui/Appbar';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  // TODO: id 기반 API 조회. 현재는 목업 사용
  const crewName = MOCK_SQUAD.crewName;

  return (
    <NoTabContentLayout header={<Appbar isMenuHeader={false} title={crewName} />}>
      <SquadMembersPage />
    </NoTabContentLayout>
  );
}
