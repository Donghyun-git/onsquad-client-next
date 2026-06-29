import { CrewHome } from '@/features/crew/home';

import { Appbar } from '@/shared/ui/Appbar';

// 인증 데이터(crew home)는 클라(CrewHome)가 BFF 경유로 조회 — 서버 prefetch 제거.
async function CrewHomePage({ params }: { params: { id: string } }) {
  const { id } = await params;

  const crewId = parseInt(id, 10);

  return (
    <>
      <Appbar />
      <CrewHome crewId={crewId} />
    </>
  );
}

export default CrewHomePage;
