import { WriteForm } from '@/features/crew/announce';

// 인증 데이터는 클라(WriteForm)가 BFF 경유로 조회 — 서버 prefetch 제거.
const AnnounceEditPage = async ({ params }: { params: { id: string; announceId: string } }) => {
  const { id, announceId } = await params;

  const crewId = parseInt(id, 10);
  const parsedAnnounceId = parseInt(announceId, 10);

  return <WriteForm crewId={crewId} announceId={parsedAnnounceId} mode="edit" />;
};

export default AnnounceEditPage;
