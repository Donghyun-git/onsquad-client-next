import { AnnounceDetail } from '@/features/crew/announce-detail';

interface AnnounceDetailPageProps {
  params: { id: string; announceId: string };
}

// 인증 데이터는 클라(AnnounceDetail)가 BFF 경유로 조회 — 서버 prefetch 제거.
const AnnounceDetailPage = async ({ params }: AnnounceDetailPageProps) => {
  const { id, announceId } = await params;

  const crewId = parseInt(id, 10);
  const parsedAnnounceId = parseInt(announceId, 10);

  return <AnnounceDetail crewId={crewId} announceId={parsedAnnounceId} />;
};

export default AnnounceDetailPage;
