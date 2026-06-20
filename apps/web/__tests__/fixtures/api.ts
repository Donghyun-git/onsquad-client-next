/**
 * 외부 API 모킹 Fixtures
 *
 * 가이드라인에 따라 외부 API 의존성이 있는 경우에만 사용합니다.
 * - E2E 테스트에서 에러 시나리오 테스트에 한해 허용
 * - 하드코딩된 테스트 데이터 사용 금지
 *
 * 실제 외부 API:
 * - 백엔드 API: http://43.203.4.6:8080/api
 * - Supabase API
 * - 카카오 로그인 API
 *
 * API 응답 형식 (OnSquad API 문서 참고):
 * - 성공: { "status": 200, "success": true, "data": ... }
 * - 에러: { "status": 400, "success": false, "error": { "code": "...", "message": "..." } }
 */
import { ResponseModel } from '@/shared/api/model';

/**
 * API 성공 응답 Fixtures
 * OnSquad API 문서의 성공 응답 형식을 따릅니다.
 */
export const createMockApiSuccessResponse = <T = unknown>(data: T, status = 200): ResponseModel & { data: T } => ({
  status,
  success: true,
  data,
});

/**
 * 빈 데이터 성공 응답 (201, 204 등)
 * 회원가입, 삭제 등 데이터가 없는 성공 응답에 사용합니다.
 */
export const createMockApiEmptySuccessResponse = (status = 201): ResponseModel & { data: '' } => ({
  status,
  success: true,
  data: '',
});

/**
 * API 에러 응답 Fixtures
 * OnSquad API 문서의 에러 응답 형식을 따릅니다.
 * 에러 시나리오 테스트에 사용합니다.
 */
export const createMockApiErrorResponse = (
  message: string,
  code = 'API_ERROR',
  status = 400,
): ResponseModel & { error: { code: string; message: string } } => ({
  status,
  success: false,
  error: {
    code,
    message,
  },
});

/**
 * 일반적인 성공 응답 (빠른 사용을 위한 헬퍼)
 */
export const mockApiSuccessResponse = createMockApiSuccessResponse({});

/**
 * 일반적인 에러 응답 (빠른 사용을 위한 헬퍼)
 */
export const mockApiErrorResponse = createMockApiErrorResponse('API 요청 실패');

/**
 * 인증 에러 응답
 */
export const mockApiUnauthorizedErrorResponse = createMockApiErrorResponse('인증이 필요합니다', 'UNAUTHORIZED', 401);

/**
 * 서버 에러 응답
 */
export const mockApiServerErrorResponse = createMockApiErrorResponse('서버 오류가 발생했습니다', 'SERVER_ERROR', 500);
