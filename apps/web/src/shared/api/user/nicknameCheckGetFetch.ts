import { publicApiFetch } from '../common';
import { ResponseModel } from '../model';

export interface NicknameCheckGetFetchParams {
  nickname: string;
}

export interface NicknameCheckResponseProps extends ResponseModel {
  data: {
    duplicate: boolean;
  };
}

export const nicknameCheckGetFetch = ({ nickname }: NicknameCheckGetFetchParams) =>
  publicApiFetch.get<NicknameCheckResponseProps>(`/members/check-nickname?value=${nickname}`);
