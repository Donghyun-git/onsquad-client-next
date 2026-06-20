import { CrewDetailAppbar } from '@/features/crew/detail';

import NoTabContentLayout from '../NoTabContentLayout';

// PoC: 인증 데이터(crew 상세)는 서버 prefetch 하지 않고 클라이언트(CrewDetail)가 BFF 경유로 가져온다.
// 회전 refresh token 의 persist 가 RSC 에서는 불가하므로(쿠키 write 불가),
// 브라우저 → BFF Route Handler → 백엔드 경로로 refresh·persist 를 서버에서 처리한다.
// 헤더 title(크루명) 역시 클라(CrewDetailAppbar)가 동일 detail 쿼리로 조회한다.
async function CrewDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const crewId = parseInt(id, 10);

  return (
    <NoTabContentLayout header={<CrewDetailAppbar crewId={crewId} />}>
      <div
        id="no-tab-wrapper"
        className="fixed inset-x-0 top-[var(--app-header-height)] z-0 mx-auto flex h-[calc(100svh-var(--app-header-height))] max-w-[45rem] overflow-y-auto bg-[#f8f8f8]"
      >
        <div className="mx-auto grow p-5">{children}</div>
      </div>
    </NoTabContentLayout>
  );
}

export default CrewDetailLayout;
