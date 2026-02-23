import * as yup from 'yup';

import { profileSchema } from '../model/profileSchema';

type UpdateProfileCleansingData = yup.InferType<typeof profileSchema>;

export const getUpdateProfileCleansingData = (data: Partial<UpdateProfileCleansingData>) => {
  return {
    nickname: data.nickname ?? '',
    introduce: data.introduce ?? '',
    mbti: data.mbti ?? '',
    kakaoLink: data.kakaoLink ?? '',
    address: data.address ?? '',
    addressDetail: data.addressDetail ?? '',
  };
};
