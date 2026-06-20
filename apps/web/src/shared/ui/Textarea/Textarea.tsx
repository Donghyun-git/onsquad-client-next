import React from 'react';
import { ReactNode } from 'react';

import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';

import { useExtractNumberHandler } from '@/shared/lib/hooks/useExtractNumberHandler';
import { cn } from '@/shared/lib/utils';
import { Textarea } from '@/shared/ui/ui/textarea';

import { Label } from '../ui/label';

interface CustomTextAreaPropsType<T extends FieldValues> {
  name: Path<T>;
  label?: ReactNode;
  helperText?: string;
  className?: string;

  extractNumber?: boolean;
  button?: ReactNode | ReactNode[];
  defaultValue?: string;
  value?: string;
  placeholder?: string;
  maxLength?: number;
  disabled?: boolean;
  readOnly?: boolean;
}

const CustomTextArea = <T extends FieldValues>(props: CustomTextAreaPropsType<T>) => {
  const { name, label, button, helperText, extractNumber = false, className, ...rest } = props;

  const {
    control,
    formState: { errors },
  } = useFormContext<T>();

  const fieldError = errors[name];
  const errorMessage = fieldError ? (fieldError.message as string) : null;

  const handleExtractNumber = useExtractNumberHandler();

  return (
    <div className={`form-control w-full ${fieldError ? 'is-invalid' : ''}`}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <div className="w-full">
            {label ? (
              <div className="mb-2 flex items-center">
                <Label htmlFor={name} className="text-grayScale800 block font-bold">
                  {label}
                </Label>
              </div>
            ) : null}

            <div className="relative">
              <Textarea
                id={name}
                value={value}
                onChange={
                  extractNumber
                    ? (e: React.ChangeEvent<HTMLTextAreaElement>) => {
                        handleExtractNumber(e);
                        onChange(e);
                      }
                    : onChange
                }
                className={`${cn(
                  `block w-full resize-none rounded-md border border-[#f8f8f8] px-3 py-2 placeholder:text-grayscale500 focus:outline-none ${className} ${
                    fieldError && 'border-2 border-red-500 focus-visible:border-red-500 focus-visible:outline-red-500'
                  }`,
                )}`}
                {...rest}
              />
              {button}
            </div>
            {fieldError ? (
              <p className="mt-2 text-left text-sm text-red-600">{errorMessage}</p>
            ) : helperText ? (
              <p className="mt-2 text-left text-sm text-gray-500">{helperText}</p>
            ) : null}
          </div>
        )}
      />
    </div>
  );
};

export default CustomTextArea;
