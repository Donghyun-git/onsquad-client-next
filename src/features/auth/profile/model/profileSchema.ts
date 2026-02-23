import * as yup from 'yup';

import { MBTI } from '@/shared/config';

export const profileSchema = yup.object().shape({
  nickname: yup.string().required('닉네임을 입력해주세요.'),
  introduce: yup.string().required('멋진 소개를 입력해주세요.'),
  kakaoLink: yup.string().required('오픈 카톡 프로필 링크를 입력해주세요.'),
  profileImage: yup.mixed(),
  mbti: yup
    .string()
    .oneOf([...MBTI, ''])
    .required('MBTI를 선택해주세요.'),
  address: yup.string().required('주소를 입력해주세요.'),
  addressDetail: yup.string(),
  profileImageFile: yup.mixed(),
});
