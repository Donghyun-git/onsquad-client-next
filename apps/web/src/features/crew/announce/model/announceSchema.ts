import * as yup from 'yup';

export const announceSchema = yup.object().shape({
  title: yup.string().required('제목을 입력해주세요.'),
  content: yup.string().required('공지사항 내용을 입력해주세요.'),
});
