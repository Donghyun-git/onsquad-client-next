import { Appbar } from '@/shared/ui/Appbar';
import { BottomTab } from '@/shared/ui/BottomTab';

const WithTabLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div id="wrapper">
      <Appbar />
      <div
        className="fixed inset-x-0 top-[var(--app-header-height)] z-0 mx-auto h-[calc(100svh-var(--app-header-height)-var(--app-tab-height))] max-w-[45rem] overflow-y-auto bg-gray-50 px-5 pb-5 pt-5"
        style={{ paddingBottom: 'calc(1.25rem + env(safe-area-inset-bottom))' }}
      >
        {children}
      </div>
      <BottomTab />
    </div>
  );
};

export default WithTabLayout;
