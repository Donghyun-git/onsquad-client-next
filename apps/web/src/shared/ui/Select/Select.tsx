'use client';

import * as React from 'react';

import { SelectProps } from '@radix-ui/react-select';
import { Controller, useFormContext } from 'react-hook-form';

import { cn } from '@/shared/lib/utils';
import { Label } from '@/shared/ui/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger } from '@/shared/ui/ui/select';

interface CustomSelectProps extends SelectProps {
  className?: string;
  ref?: React.RefObject<HTMLButtonElement>;
  name: string;
  label?: string;
  id?: string;
  options: {
    value: string;
    item: string;
  }[];
}

const CustomSelect = ({ className, ref, options, label, id, name }: CustomSelectProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => {
        const selectedItem = options.find((option) => option.value === value)?.item || '선택하세요';

        return (
          <>
            {label && (
              <Label className="mb-2 flex items-center" htmlFor={id}>
                {label}
              </Label>
            )}
            <Select value={value} onValueChange={onChange}>
              <SelectTrigger ref={ref} className={cn('w-full', className)}>
                {selectedItem}
              </SelectTrigger>
              <SelectContent id={id}>
                <SelectGroup>
                  {options.map((option, i) => (
                    <SelectItem key={i} value={option.value} aria-selected={value === option.value}>
                      {option.item}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </>
        );
      }}
    />
  );
};

export default CustomSelect;
