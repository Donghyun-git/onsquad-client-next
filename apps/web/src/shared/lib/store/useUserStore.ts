import type { Session } from 'next-auth';
import { create } from 'zustand';

interface UserStoreState {
  user: Session | null;
}

interface UserStoreActions {
  setUserInfo: (state: Session) => void;
  removeUserInfo: () => void;
}

export const useUserStore = create<Partial<UserStoreState & UserStoreActions>>((set) => ({
  user: null,

  setUserInfo: (state) =>
    set({
      user: {
        ...state,
      },
    }),

  removeUserInfo: () =>
    set(
      ({ setUserInfo, removeUserInfo }) => ({
        user: null,
        setUserInfo,
        removeUserInfo,
      }),
      true,
    ),
}));
