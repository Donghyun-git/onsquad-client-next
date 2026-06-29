import { Appbar } from '@/shared/ui/Appbar';

import { MyCrewsView } from './MyCrewsView';

const MyCrewsPage = () => {
  return (
    <>
      <Appbar title="내 크루" />
      <MyCrewsView />
    </>
  );
};

export default MyCrewsPage;
