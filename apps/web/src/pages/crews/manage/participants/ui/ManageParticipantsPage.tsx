import { CrewManageWrapper } from '@/widgets/CrewManageWrapper';

import { ParticipantList } from '@/features/crew/manage/participants';

// 인증 데이터는 클라(ParticipantList)가 BFF 경유로 조회 — 서버 prefetch 제거.
const ManageParticipantsPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  const crewId = parseInt(id, 10);

  return (
    <CrewManageWrapper title="참가 신청">
      <ParticipantList crewId={crewId} />
    </CrewManageWrapper>
  );
};

export default ManageParticipantsPage;
