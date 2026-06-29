import { Appbar } from '@/shared/ui/Appbar';

import { ActivityTabs } from './ActivityTabs';

const ActivityPage = () => {
  return (
    <>
      <Appbar isMenuHeader={false} title="활동내역" />
      <ActivityTabs />
    </>
  );
};

export default ActivityPage;
