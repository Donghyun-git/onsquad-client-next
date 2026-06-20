import { WriteForm } from '@/features/crew/announce/ui/WriteForm';

import { Appbar } from '@/shared/ui/Appbar';

export default async function AnnounceWritePage({ params }: { params: { id: string } }) {
  const { id } = await params;

  const crewId = parseInt(id, 10);

  return (
    <>
      <Appbar isMenuHeader={false} title="공지사항" />
      <WriteForm crewId={crewId} mode="add" />
    </>
  );
}
