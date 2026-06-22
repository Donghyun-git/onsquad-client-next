import * as yup from 'yup';

export const createSquadSchema = yup.object().shape({
  title: yup.string().required('제목을 입력해주세요'),
  content: yup.string().required('내용을 입력해주세요'),
  capacity: yup
    .string()
    .required('모집 인원을 입력해주세요')
    .test('min-capacity', '모집 인원은 1명 이상이어야 합니다', (value) => {
      if (!value) return false;
      return Number(value) >= 1;
    }),
  address: yup.string().required('주소를 검색해주세요'),
  addressDetail: yup.string().required('상세 주소를 입력해주세요'),
  categories: yup
    .array()
    .of(yup.string().required())
    .min(1, '카테고리를 선택해주세요')
    .max(5, '최대 5개까지 선택할 수 있어요')
    .required('카테고리를 선택해주세요'),
  kakaoLink: yup
    .string()
    .required('카카오 오픈채팅 링크를 입력해주세요')
    .matches(/^(https?:\/\/[^\s/$.?#].[^\s]*)$/, '유효한 URL을 입력해주세요'),
  discordLink: yup
    .string()
    .default('')
    .matches(/^(https?:\/\/[^\s/$.?#].[^\s]*)$/, { message: '유효한 URL을 입력해주세요', excludeEmptyString: true }),
});

export type CreateSquadFormValues = yup.InferType<typeof createSquadSchema>;
