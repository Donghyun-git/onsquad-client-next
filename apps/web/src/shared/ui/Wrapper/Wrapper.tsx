import type { ReactNode } from 'react';

interface LayoutPropsType {
  children: ReactNode | ReactNode[];
}

const Wrapper = ({ children }: LayoutPropsType) => {
  return (
    <main className="relative mx-auto min-w-[20rem] max-w-[45rem]">
      {children}
      {/* 오버레이(사이드 시트 등)를 앱 컬럼 폭·풀높이에 스코프시키기 위한 포탈 타깃.
          overflow-hidden으로 컬럼 밖(여백)을 클리핑해 시트가 컬럼 모서리에서 슬라이드되도록 한다. */}
      <div
        id="app-portal-root"
        className="pointer-events-none fixed inset-y-0 left-1/2 z-[101] w-full min-w-[20rem] max-w-[45rem] -translate-x-1/2 transform overflow-hidden"
      />
    </main>
  );
};

export default Wrapper;
