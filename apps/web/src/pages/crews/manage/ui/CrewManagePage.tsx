import { CrewManageWrapper } from '@/widgets/CrewManageWrapper';

import { CrewManageList } from '@/features/crew/manage';

// 인증 데이터는 클라(CrewManageList)가 BFF 경유로 조회 — 서버 prefetch 제거.
const CrewManagePage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  const crewId = parseInt(id, 10);

  return (
    <CrewManageWrapper title="크루 관리">
      <CrewManageList crewId={crewId} />
    </CrewManageWrapper>
  );
};

export default CrewManagePage;
