import { Appbar } from '@/shared/ui/Appbar';

import { ApplicationList } from '@/features/activity/applications/ui';

const MyApplicationsPage = () => {
  return (
    <>
      <Appbar isMenuHeader={false} title="합류신청" />
      <div className="min-h-screen bg-grayscale50 pt-14">
        <ApplicationList />
      </div>
    </>
  );
};

export default MyApplicationsPage;
