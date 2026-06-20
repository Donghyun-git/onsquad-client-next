import { CrewDetail } from '@/features/crew/detail';

interface CrewDetailPageProps {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function CrewDetailPage({ params }: CrewDetailPageProps) {
  const { id } = await params;

  const crewId = parseInt(id, 10);

  return <CrewDetail crewId={crewId} />;
}
