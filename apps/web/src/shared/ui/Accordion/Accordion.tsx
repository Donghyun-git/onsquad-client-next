'use client';

import { useState } from 'react';

import { CircleX } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import { TOAST } from '@/shared/config/toast';
import { useToast } from '@/shared/lib/hooks/useToast';
import { cn } from '@/shared/lib/utils';
import { AccordionContent, AccordionItem, AccordionTrigger, Accordion as LibAccordion } from '@/shared/ui/ui/accordion';

import { Button } from '../ui/button';

interface AccordionPropsType {
  /**
   * form method key name
   */
  name: string;
  list: {
    title: string;
    value: string;
    tags: string[];
  }[];

  defaultValue?: string[];

  onSubmit?: (args: string[]) => void;
  onCancel?: () => void;
}

const Accordion = (props: AccordionPropsType) => {
  const { toast, hide } = useToast();

  const { name, list, defaultValue, onSubmit, onCancel } = props;

  const method = useFormContext();

  const { getValues, trigger } = method;

  const parentSelectedItem = getValues(name) as string[];

  const [selectedItem, setSelectedItem] = useState<string[]>(parentSelectedItem);

  return (
    <>
      <LibAccordion type="multiple" className="w-full" defaultValue={defaultValue}>
        {list.map((item, index) => (
          <AccordionItem key={index} value={item.value}>
            <AccordionTrigger>{item.title}</AccordionTrigger>
            <AccordionContent>
              <div className="grid max-h-72 grid-flow-row grid-cols-2 gap-1 overflow-auto pr-4">
                {item.tags.map((tag, tagIndex) => (
                  <div
                    key={tagIndex}
                    className={cn(
                      'flex h-[45px] cursor-pointer items-center justify-center rounded-lg border border-grayscale200 bg-white text-lg text-grayscale400',
                      selectedItem.includes(tag) && 'border-secondary bg-secondary text-white',
                    )}
                    onClick={() => {
                      if (selectedItem.includes(tag)) {
                        const filteredItem = [...selectedItem].filter((item) => item !== tag);

                        setSelectedItem(filteredItem);

                        return;
                      }

                      if (selectedItem.length >= 5) {
                        toast({
                          title: '최대 5개까지 등록가능해요.',
                          icon: <CircleX onClick={() => hide()} />,
                          className: TOAST.warn,
                        });
                        return;
                      }

                      setSelectedItem([...selectedItem, tag]);
                    }}
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </LibAccordion>

      <div className="buttonArea flex flex-col gap-2">
        {onSubmit && (
          <Button
            className="w-full"
            onClick={() => {
              onSubmit(selectedItem);
              onCancel?.();

              trigger(name);
            }}
          >
            입력완료
          </Button>
        )}

        {onCancel && (
          <Button
            className="w-full bg-grayscale200 text-grayscale500 hover:bg-grayscale300 active:bg-grayscale400"
            onClick={() => {
              setSelectedItem([]);

              onCancel?.();
            }}
          >
            취소
          </Button>
        )}
      </div>
    </>
  );
};

export default Accordion;
