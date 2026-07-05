import { apiFetch } from '@/shared/api/common';
import type { ResponseModel } from '@/shared/api/model';

export interface UserProfileImagePatchFetchParams {
  file: File;
}

export type UserProfileImagePatchFetchResponseProps = ResponseModel;

/**
 * 회원 프로필 이미지 변경
 * - PATCH /api/members/me/image (multipart, part name: file)
 */
export const userProfileImagePatchFetch = ({ file }: UserProfileImagePatchFetchParams) => {
  const formData = new FormData();

  formData.append('file', file);

  return apiFetch.patch<UserProfileImagePatchFetchResponseProps>('/members/me/image', formData);
};
