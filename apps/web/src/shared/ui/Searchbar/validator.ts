import * as yup from 'yup';

export const searchSchema = yup.object().shape({
  search: yup.string().required('검색어를 입력해주세요.').trim().min(2, '검색어는 최소 2자 이상 입력해주세요.'),
});
