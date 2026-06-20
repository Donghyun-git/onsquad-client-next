import { AnnounceList } from '@/features/crew/announce';

interface AnnouncePageProps {
  params: { id: string };
}

// 인증 데이터는 클라(AnnounceList)가 BFF 경유로 조회한다 — 회전 refresh token persist 가
// RSC 에서 불가하므로 서버 prefetch 를 두지 않는다(셸은 그대로 SSR).
export default async function AnnouncePage({ params }: AnnouncePageProps) {
  const { id } = await params;

  const crewId = parseInt(id, 10);

  return <AnnounceList crewId={crewId} />;
}
