import { apiFetch } from '@/shared/api/common';
import { ResponseModel } from '@/shared/api/model';

export interface ChangePasswordPatchFetchParams {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

export interface ChangePasswordPatchFetchResponse extends ResponseModel {}

/**
 * 패스워드 변경
 */
export const changePasswordPatchFetch = (params: ChangePasswordPatchFetchParams) =>
  apiFetch.patch<ChangePasswordPatchFetchResponse>('/members/me/password', params);
