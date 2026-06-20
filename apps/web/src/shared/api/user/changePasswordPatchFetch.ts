import { apiFetch } from '../common';
import { ResponseModel } from '../model';

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
  apiFetch.patch<ChangePasswordPatchFetchResponse>('/my', params);
