import { NoTabContentLayout } from '@/app/layouts';

import { NotificationList } from '@/features/notification/list';

import { Appbar } from '@/shared/ui/Appbar';
import { PullToRefresh } from '@/shared/ui/PullToRefresh';

const NotificationListPage = () => {
  return (
    <NoTabContentLayout header={<Appbar title="알림" />}>
      <PullToRefresh>
        <NotificationList />
      </PullToRefresh>
    </NoTabContentLayout>
  );
};

export default NotificationListPage;
