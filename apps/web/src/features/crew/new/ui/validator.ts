import * as yup from 'yup';

export const addCrewSchema = yup.object().shape({
  name: yup.string().required('사용하실 크루 이름을 입력해주세요.').max(15, '크루 이름은 최대 15자 입니다.'),
  introduce: yup.string().required('크루의 멋진 소개를 적어주세요.').max(150, '크루소개는 최대 150자로 입력해주세요.'),
  detail: yup
    .string()
    .required('신청자가 볼 크루에 대한 정보를 알려주세요.')
    .max(150, '크루 상세정보는 최대 150자로 입력해주세요.'),
  kakaoLink: yup
    .string()
    .required('소통방 링크를 입력해주세요.')
    .matches(/^(https?:\/\/[^\s/$.?#].[^\s]*)$/, '유효한 URL을 입력해주세요.'),
  hashtags: yup
    .array()
    .of(yup.string().required('해시태그를 입력해주세요.'))
    .required('해시태그를 선택해주세요.')
    .min(1, '최소 1개의 해시태그가 필요합니다.')
    .max(5, '해시태그는 최대 5개입니다.'),

  file: yup.lazy(() =>
    yup
      .mixed()
      .nullable()
      .when('file', (file, schema) => {
        console.log(file, schema);
        return file instanceof File
          ? schema.test(
              'is-file',
              '크루 대표이미지를 선택해주세요. (png, jpg, svg)',
              (value) => !value || value instanceof File, // 파일이 없거나 파일 인스턴스일 때만 통과
            )
          : schema.notRequired();
      }),
  ),
});
