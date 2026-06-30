import { NoTabContentLayout } from '@/app/layouts';

import { NotificationList } from '@/features/notification/list';

import { Appbar } from '@/shared/ui/Appbar';

const NotificationListPage = () => {
  return (
    <NoTabContentLayout header={<Appbar title="알림" />}>
      <NotificationList />
    </NoTabContentLayout>
  );
};

export default NotificationListPage;
