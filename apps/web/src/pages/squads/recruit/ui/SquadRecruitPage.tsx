import { MOCK_SQUAD } from '@/entities/squad';

import { NoTabContentLayout } from '@/app/layouts';

import { SquadRecruit } from '@/features/squad/recruit';

import { Appbar } from '@/shared/ui/Appbar';

const SquadRecruitPage = () => {
  // TODO: id 기반 API 조회. 현재는 목업 사용
  const crewName = MOCK_SQUAD.crewName;

  return (
    <NoTabContentLayout header={<Appbar title={crewName} />}>
      <SquadRecruit />
    </NoTabContentLayout>
  );
};

export default SquadRecruitPage;
