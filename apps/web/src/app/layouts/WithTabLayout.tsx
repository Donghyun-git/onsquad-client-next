import { GlobalHeader } from '@/widgets/GlobalHeader';

import { BottomTab } from '@/shared/ui/BottomTab';
import { PullToRefresh } from '@/shared/ui/PullToRefresh';
import { ScrollContainer } from '@/shared/ui/ScrollContainer';

const WithTabLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div id="wrapper">
      <GlobalHeader />
      <ScrollContainer className="fixed inset-x-0 top-[var(--app-header-height)] z-0 mx-auto h-[calc(100svh-var(--app-header-height)-var(--app-tab-height))] max-w-[45rem] overflow-y-auto bg-gray-50 px-5 pb-5 pt-5">
        <PullToRefresh>{children}</PullToRefresh>
      </ScrollContainer>
      <BottomTab />
    </div>
  );
};

export default WithTabLayout;
