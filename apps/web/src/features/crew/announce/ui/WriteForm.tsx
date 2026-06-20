'use client';

import { useRouter } from 'next/navigation';

import { yupResolver } from '@hookform/resolvers/yup';
import { useQuery } from '@tanstack/react-query';
import { CircleCheck, CircleX } from 'lucide-react';
import { Controller, FormProvider, useForm } from 'react-hook-form';

import { crewQueries } from '@/entities/crew/api/crew.queries';

import { TOAST } from '@/shared/config/toast';
import { useToast } from '@/shared/lib';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Spinner } from '@/shared/ui/Spinner';
import { TextEditor } from '@/shared/ui/TextEditor';

import { ANNOUNCE_REDIRECT_PATH, ANNOUNCE_TOAST } from '../config';
import { announceSchema } from '../model/announceSchema';
import { useAnnounceRegisterMutation } from '../model/useAnnounceRegisterMutation';
import { useAnnounceUpdateMutation } from '../model/useAnnounceUpdateMutation';

interface WriteFormProps {
  crewId: number;
  announceId?: number;
  mode: 'add' | 'edit';
}

export const WriteForm = ({ crewId, announceId, mode }: WriteFormProps) => {
  const router = useRouter();

  const { toast } = useToast();

  const { data } = useQuery({
    ...crewQueries.announceDetail({ crewId, announceId: announceId ?? 0 }),
    enabled: mode === 'edit',
  });

  const method = useForm({
    resolver: yupResolver(announceSchema),
    values: {
      title: data?.title ?? '',
      content: data?.content ?? '',
    },
  });

  const { handleSubmit: submit } = method;

  const { mutateAsync: registerAnnounce, isPending: isRegisterPending } = useAnnounceRegisterMutation({ crewId });

  const { mutateAsync: updateAnnounce, isPending: isUpdatePending } = useAnnounceUpdateMutation({
    crewId,
    announceId: announceId ?? 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await submit(
        async (data) => {
          if (mode === 'edit') {
            await updateAnnounce(data);
          } else {
            await registerAnnounce(data);
          }

          toast({
            title: ANNOUNCE_TOAST[mode],
            icon: <CircleCheck />,
            className: TOAST.success,
          });

          router.replace(ANNOUNCE_REDIRECT_PATH[mode](crewId, announceId ?? 0), {
            scroll: false,
          });
        },
        (errors) => {
          const firstError = Object.values(errors)?.[0]?.message;

          if (firstError) {
            toast({
              title: firstError as string,
              icon: <CircleX />,
              className: TOAST.error,
            });
          }
        },
      )(e);
    } catch (error) {
      console.error('Form error:', error);
    }
  };

  return (
    <>
      {isRegisterPending ? <Spinner /> : null}
      <div className="h-full overflow-hidden px-0">
        <div className="flex h-full flex-col gap-6 px-4">
          <FormProvider {...method}>
            <form onSubmit={handleSubmit} className="flex h-full grow flex-col justify-between space-y-6">
              <Input name="title" type="text" label="제목" placeholder="제목을 입력하세요" />

              <div className="grow">
                <Controller
                  name="content"
                  control={method.control}
                  render={({ field: { onChange, value } }) => (
                    <TextEditor
                      value={value}
                      onChange={(val) => onChange(val?.trim() ?? '')}
                      placeholder="공지사항을 작성해주세요."
                    />
                  )}
                />
              </div>

              <div className="flex items-center border-t pt-4">
                <Button isLoading={isRegisterPending || isUpdatePending} className="w-full" type="submit">
                  저장
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </>
  );
};
