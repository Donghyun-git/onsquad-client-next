import { NotificationListPage } from '@/pages/notifications';
import { NoTabContentLayout } from '@/app/layouts';
import { Appbar } from '@/shared/ui/Appbar';

export default function Page() {
  return (
    <NoTabContentLayout header={<Appbar title="알림" />}>
      <NotificationListPage />
    </NoTabContentLayout>
  );
}
