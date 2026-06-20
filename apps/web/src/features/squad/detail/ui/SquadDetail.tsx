'use client';

import React from 'react';

interface SquadDetailProps {
  id: string;
}

export const SquadDetail = ({ id }: SquadDetailProps) => {
  return <div className="container pt-14">SquadDetail - {id}</div>;
};
