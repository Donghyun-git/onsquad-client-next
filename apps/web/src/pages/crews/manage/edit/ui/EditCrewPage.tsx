import { CrewManageWrapper } from '@/widgets/CrewManageWrapper';

import { EditForm } from '@/features/crew/edit';

const EditCrewPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  const crewId = parseInt(id, 10);

  return (
    <CrewManageWrapper title="크루정보 수정">
      <EditForm crewId={crewId} />
    </CrewManageWrapper>
  );
};

export default EditCrewPage;
