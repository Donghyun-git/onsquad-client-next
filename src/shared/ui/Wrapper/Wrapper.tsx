import type { ReactNode } from 'react';

interface LayoutPropsType {
  children: ReactNode | ReactNode[];
}

const Wrapper = ({ children }: LayoutPropsType) => {
  return <main className="relative mx-auto min-w-[20rem] max-w-[45rem]">{children}</main>;
};

export default Wrapper;
