import type { Metadata } from 'next';

import { publicApiFetch } from '@/shared/api/common';
import type { CrewDetailResponseProps } from '@/shared/api/crew/crewDetailGetFetch';

const FALLBACK_CREW: Metadata = { title: '크루 | OnSquad' };

export async function buildCrewMetadata(crewId: number): Promise<Metadata> {
  try {
    const res = await publicApiFetch.get<CrewDetailResponseProps>(`/crews/${crewId}`);
    // 백엔드는 401 을 HTTP 200 + { success:false } 로 감싼다. 명시적으로 가드한다.
    if (!res.data?.success || !res.data?.data) return FALLBACK_CREW;
    const { name, introduce } = res.data.data;
    return { title: `${name} | OnSquad`, description: introduce, openGraph: { title: name, description: introduce } };
  } catch {
    return FALLBACK_CREW;
  }
}
