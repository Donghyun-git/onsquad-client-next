import type { Metadata } from 'next';

import { buildCrewMetadata } from '@/entities/crew';

export { CrewLayout as default } from '@/app/layouts';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  return buildCrewMetadata(Number(id));
}
