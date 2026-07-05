'use client';

import { useState } from 'react';

import { CircleX } from 'lucide-react';

import { crewQueries } from '@/entities/crew';
import { addCrewPostFetch } from '@/entities/crew/api/new/addCrewPostFetch';

import { CrewForm, type CrewFormSubmitMeta, type CrewFormValues } from '@/features/crew/form';

import { TOAST } from '@/shared/config/toast';
import { usePageMove } from '@/shared/lib/hooks';
import { useToast } from '@/shared/lib/hooks/useToast';
import { useApiMutation } from '@/shared/lib/queries/useApiMutation';

/**
 * 크루 개설하기 작성 폼
 */
const AddForm = () => {
  const { handleReplace } = usePageMove();

  const { toast, hide } = useToast();

  const [displaySpinner, setDisplaySpinner] = useState<boolean>(false);

  const { mutateAsync: addCrew } = useApiMutation({
    fetcher: addCrewPostFetch,
    invalidateKey: crewQueries.lists(),
  });

  const handleSubmit = async (values: CrewFormValues, meta: CrewFormSubmitMeta) => {
    setDisplaySpinner(true);

    try {
      await addCrew({
        ...values,
        file: meta.file ?? ({} as File),
      });

      toast({
        title: '크루 생성에 성공했어요.',
        icon: <CircleX onClick={() => hide()} />,
        className: TOAST.success,
      });

      setTimeout(() => {
        handleReplace('/');
      }, 1000);
    } catch (error) {
      console.error(error);

      setDisplaySpinner(false);
    }
  };

  return <CrewForm mode="add" submitting={displaySpinner} onSubmit={handleSubmit} />;
};

export default AddForm;
