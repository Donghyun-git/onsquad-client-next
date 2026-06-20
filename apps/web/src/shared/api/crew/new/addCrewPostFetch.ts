import { apiFetch } from '../../common';
import type { ResponseModel } from '../../model';

export interface AddCrewPostFetchParams {
  name: string;
  introduce: string;
  detail: string;
  kakaoLink: string;
  hashtags: string[];
  file: File;
}

export interface AddCrewResponseProps extends ResponseModel {
  data: '';
}

export const addCrewPostFetch = (params: AddCrewPostFetchParams) => {
  const { file, ...rest } = params;

  const formData = new FormData();

  formData.append('file', file);
  formData.append(
    'request',
    new Blob(
      [
        JSON.stringify({
          ...rest,
        }),
      ],
      {
        type: 'application/json',
      },
    ),
  );

  return apiFetch.post<AddCrewResponseProps>('/crews', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
