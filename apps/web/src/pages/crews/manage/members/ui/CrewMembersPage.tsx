import { CrewManageWrapper } from '@/widgets/CrewManageWrapper';

import { CrewMemberList } from '@/features/crew/manage/members';

const CrewMembersPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  const crewId = parseInt(id, 10);

  return (
    <CrewManageWrapper title="크루원">
      <CrewMemberList crewId={crewId} />
    </CrewManageWrapper>
  );
};

export default CrewMembersPage;
