import React from 'react';

import { Appbar } from '@/shared/ui/Appbar';

import NoTabContentLayout from '../NoTabContentLayout';

const AddCrewLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <NoTabContentLayout header={<Appbar isMenuHeader={false} title="크루 개설하기" />}>{children}</NoTabContentLayout>
  );
};

export default AddCrewLayout;
