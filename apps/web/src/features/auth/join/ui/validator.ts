import * as yup from 'yup';

import { LOGIN_REGEXP } from '@/shared/config/regexp';

export const joinSchema = yup.object().shape({
  email: yup.string().required('이메일을 입력해주세요,').matches(LOGIN_REGEXP.email, '이메일 형식에 맞지 않습니다.'),

  authCode: yup.string().required('이메일 인증을 진행해주세요.').min(8, '인증번호는 최소 8자리입니다.'),

  password: yup
    .string()
    .required('비밀번호를 입력해주세요.')
    .matches(LOGIN_REGEXP.password, '영문, 숫자, 특수문자 1자를 포함한 8자리 이상입니다.'),

  passwordConfirm: yup
    .string()
    .required('비밀번호를 한 번 더 입력해주세요.')
    .oneOf([yup.ref('password')], '비밀번호가 일치하지 않습니다.'),

  nickname: yup.string().required('닉네임을 입력해주세요.'),

  address: yup.string().required('주소를 검색해주세요.'),

  addressDetail: yup.string(),
});

export type JoinSchemaType = yup.InferType<typeof joinSchema>;
