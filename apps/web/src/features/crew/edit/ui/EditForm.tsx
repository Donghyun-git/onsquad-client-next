'use client';

import { useQuery } from '@tanstack/react-query';
import { CircleX } from 'lucide-react';

import { crewQueries } from '@/entities/crew';

import { CrewForm, type CrewFormSubmitMeta, type CrewFormValues } from '@/features/crew/form';

import { PATH } from '@/shared/config/paths';
import { TOAST } from '@/shared/config/toast';
import { usePageMove } from '@/shared/lib/hooks';
import { useToast } from '@/shared/lib/hooks/useToast';

import { useDeleteCrewImageMutation } from '../model/useDeleteCrewImageMutation';
import { useUpdateCrewImageMutation } from '../model/useUpdateCrewImageMutation';
import { useUpdateCrewInfoMutation } from '../model/useUpdateCrewInfoMutation';

interface EditFormProps {
  crewId: number;
}

/**
 * 크루정보 수정 폼
 */
const EditForm = ({ crewId }: EditFormProps) => {
  const { handleReplace } = usePageMove();

  const { toast, hide } = useToast();

  const { data } = useQuery(crewQueries.detail({ crewId }));

  const { mutateAsync: updateInfo, isPending: isUpdateInfoPending } = useUpdateCrewInfoMutation({ crewId });
  const { mutateAsync: updateImage, isPending: isUpdateImagePending } = useUpdateCrewImageMutation({ crewId });
  const { mutateAsync: deleteImage, isPending: isDeleteImagePending } = useDeleteCrewImageMutation({ crewId });

  const crew = data?.data;

  const handleSubmit = async (values: CrewFormValues, meta: CrewFormSubmitMeta) => {
    try {
      await updateInfo(values);

      if (meta.file) {
        await updateImage(meta.file);
      } else if (meta.removeImage) {
        await deleteImage();
      }

      toast({
        title: '크루 정보 수정에 성공했어요.',
        icon: <CircleX onClick={() => hide()} />,
        className: TOAST.success,
      });

      handleReplace(`${PATH.crews}/${crewId}`);
    } catch (error) {
      console.error(error);
    }
  };

  if (!crew) return null;

  return (
    <CrewForm
      mode="edit"
      defaultValues={{
        name: crew.name,
        introduce: crew.introduce,
        detail: crew.detail,
        kakaoLink: crew.kakaoLink,
        hashtags: crew.hashtags,
      }}
      initialImageUrl={crew.imageUrl}
      submitting={isUpdateInfoPending || isUpdateImagePending || isDeleteImagePending}
      onSubmit={handleSubmit}
    />
  );
};

export default EditForm;
