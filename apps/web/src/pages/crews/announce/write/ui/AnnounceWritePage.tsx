import { WriteForm } from '@/features/crew/announce/ui/WriteForm';

export default async function AnnounceWritePage({ params }: { params: { id: string } }) {
  const { id } = await params;

  const crewId = parseInt(id, 10);

  return <WriteForm crewId={crewId} mode="add" />;
}
