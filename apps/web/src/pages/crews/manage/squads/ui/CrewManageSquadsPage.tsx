import { CrewSquadManageList } from '@/features/crew/manage/squads';

const CrewManageSquadsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const crewId = parseInt(id, 10);

  return <CrewSquadManageList crewId={crewId} />;
};

export default CrewManageSquadsPage;
