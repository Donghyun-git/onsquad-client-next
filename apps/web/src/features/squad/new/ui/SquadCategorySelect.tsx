'use client';

import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

import { SQUAD_CATEGORIES } from '@/entities/squad';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/Button';

interface SquadCategorySelectProps {
  value: string;
  onChange: (category: string) => void;
}

const SquadCategorySelect = ({ value, onChange }: SquadCategorySelectProps) => {
  const [openGroup, setOpenGroup] = useState<string | null>('스포츠');

  const toggleGroup = (group: string) => {
    setOpenGroup((prev) => (prev === group ? null : group));
  };

  return (
    <div className="flex flex-col gap-6">
      {SQUAD_CATEGORIES.map(({ group, items }) => (
        <div key={group} className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => toggleGroup(group)}
            className="flex w-full items-center justify-between"
            aria-expanded={openGroup === group}
          >
            <span
              className={cn(
                'flex-1 text-center text-500 font-bold leading-130',
                openGroup === group ? 'text-grayscale700' : 'text-grayscale500',
              )}
            >
              {group}
            </span>
            {openGroup === group ? (
              <ChevronUp size={24} className="text-grayscale500" />
            ) : (
              <ChevronDown size={24} className="text-grayscale500" />
            )}
          </button>

          {openGroup === group && (
            <div className="flex flex-wrap gap-1">
              {items.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => onChange(item)}
                  className={cn(
                    'min-w-[calc(50%-2px)] flex-1 rounded-lg p-3 text-center text-300 font-medium leading-130',
                    value === item
                      ? 'bg-primary700 text-white'
                      : 'bg-grayscale100 text-grayscale300',
                  )}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}

      <div className="fixed bottom-5 left-1/2 w-full max-w-[45rem] -translate-x-1/2 px-5">
        <Button
          type="button"
          className="w-full bg-primary500 text-white hover:bg-primary500/90"
          onClick={() => {}}
          aria-label="카테고리 선택 완료"
        >
          선택 완료
        </Button>
      </div>
    </div>
  );
};

export default SquadCategorySelect;
