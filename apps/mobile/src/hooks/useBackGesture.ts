import { useState } from 'react';

/**
 * iOS 엣지 스와이프 뒤로가기(allowsBackForwardNavigationGestures) 활성 여부를 관리한다.
 * 당근 방식: back 버튼 헤더가 있는 화면에서만 켠다. 웹이 'NATIVE_BACK:on' / 'NATIVE_BACK:off'
 * 메시지로 알려주므로(웹 useNativeBackGesture 와 대칭), 그 와이어 규약을 여기서 해석한다.
 */
export const useBackGesture = () => {
  const [backGestureEnabled, setBackGestureEnabled] = useState(false);

  const handleMessage = (data: string) => {
    if (data === 'NATIVE_BACK:on') {
      setBackGestureEnabled(true);

      return;
    }

    if (data === 'NATIVE_BACK:off') {
      setBackGestureEnabled(false);
    }
  };

  return { backGestureEnabled, handleMessage };
};
