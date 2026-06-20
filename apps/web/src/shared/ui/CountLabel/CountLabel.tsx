import React from 'react';

//TODO: optional 해제
const CountLabel = ({ count = 12 }: { count?: number }) => {
  return (
    <div className="mb-[0.08rem] rounded-full bg-primary50 px-[3.5px] py-[1.5px] text-xs text-primary700">{count}</div>
  );
};

export default CountLabel;
