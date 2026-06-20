import { apiFetch } from '../../common';
import { ResponseModel } from '../../model';

export interface CrewCheckGetFetchParams {
  /**
   * 크루명
   */
  crewName: string;
}

export interface CrewCheckResponseProps extends ResponseModel {
  data: {
    /**
     * 체크 여부
     * - false: 사용할 수 있는 이름
     * - true: 중복된 이름
     */
    duplicate: boolean;
  };
}

/**
 * 크루명 중복조회
 */
export const crewCheckGetFetch = ({ crewName }: CrewCheckGetFetchParams) =>
  apiFetch.get<CrewCheckResponseProps>(`/crews/check?name=${crewName}`);
