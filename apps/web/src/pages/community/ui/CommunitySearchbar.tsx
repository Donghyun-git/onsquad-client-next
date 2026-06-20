'use client';

import { FormProvider, useFormContext } from 'react-hook-form';

import { Searchbar } from '@/shared/ui/Searchbar';

const CommunitySearchbar = () => {
  const method = useFormContext();

  return (
    <FormProvider {...method}>
      <Searchbar />
    </FormProvider>
  );
};

export default CommunitySearchbar;
