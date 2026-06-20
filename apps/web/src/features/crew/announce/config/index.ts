export const ANNOUNCE_TOAST = {
  add: '공지사항이 등록되었어요.',
  edit: '공지사항이 수정되었어요.',
  delete: '공지사항이 삭제되었어요.',
} as const;

export const ANNOUNCE_REDIRECT_PATH = {
  add: (crewId: number) => `/crews/${crewId}/announce`,
  edit: (crewId: number, announceId: number) => `/crews/${crewId}/announce/${announceId}`,
} as const;
