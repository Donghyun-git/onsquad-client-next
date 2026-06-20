import React from 'react';

import { MyCrew } from '@/widgets/crew-list';

import { Appbar } from '@/shared/ui/Appbar';

export default function CrewsPage() {
  return (
    <>
      <Appbar />
      <MyCrew />
    </>
  );
}
