import * as yup from 'yup';

import { LOGIN_REGEXP } from '@/shared/config/regexp';

export const changePasswordSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .required('현재 비밀번호를 입력해주세요.')
    .matches(LOGIN_REGEXP.password, '영문, 숫자, 특수문자 1자를 포함한 8자리 이상입니다.'),

  newPassword: yup
    .string()
    .required('새로운 비밀번호를 입력해주세요.')
    .matches(LOGIN_REGEXP.password, '영문, 숫자, 특수문자 1자를 포함한 8자리 이상입니다.'),

  newPasswordConfirm: yup
    .string()
    .required('새로운 비밀번호를 한 번 더 입력해주세요.')
    .oneOf([yup.ref('newPassword')], '비밀번호가 일치하지 않습니다.'),
});

export type ChangePasswordSchemaType = yup.InferType<typeof changePasswordSchema>;
