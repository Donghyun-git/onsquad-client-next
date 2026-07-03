import { NoTabContentLayout } from '@/app/layouts';

import { SquadJoin } from '@/features/squad/join';

import { Appbar } from '@/shared/ui/Appbar';

const SquadJoinPage = () => {
  return (
    <NoTabContentLayout header={<Appbar title="합류신청" />}>
      <SquadJoin />
    </NoTabContentLayout>
  );
};

export default SquadJoinPage;
