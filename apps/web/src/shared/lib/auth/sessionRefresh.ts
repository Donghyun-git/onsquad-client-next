type RefreshFn = () => Promise<boolean>;

let refreshFn: RefreshFn | null = null;
let inFlight: Promise<boolean> | null = null;

/** SessionProvider의 Bridge 에서 useSession().update 기반 refresh 함수를 등록/해제한다. */
export const registerSessionRefresh = (fn: RefreshFn | null): void => {
  refreshFn = fn;
};

export const refreshSession = (): Promise<boolean> => {
  if (inFlight) return inFlight;

  if (!refreshFn) return Promise.resolve(false);

  const promise = refreshFn();

  inFlight = promise;

  promise.finally(() => {
    if (inFlight === promise) inFlight = null;
  });

  return promise;
};
