import * as yup from 'yup';

import { LOGIN_REGEXP } from '@/shared/config/regexp';

export const loginSchema = yup.object().shape({
  email: yup.string().required('이메일을 입력해주세요.').matches(LOGIN_REGEXP.email, '이메일 형식에 맞지 않습니다.'),
  password: yup
    .string()
    .required('패스워드를 입력해주세요.')
    .matches(LOGIN_REGEXP.password, '패스워드는 영문, 숫자, 특수문자를 포함한 8자 이상입니다.'),
});
