import { useCallback, useRef, useState } from 'react';

export function useLongPress(
  onLongPress,
  { delay = 600, moveTolerance = 10 } = {},
) {
  const timerIdRef = useRef(null);
  const startPosRef = useRef(null);
  const [isPressing, setIsPressing] = useState(false);

  const start = useCallback(
    (e) => {
      // 只追蹤左鍵 / 主觸點
      if (e.button !== 0) return;
      startPosRef.current = { x: e.clientX, y: e.clientY };
      setIsPressing(true);

      timerIdRef.current = window.setTimeout(() => {
        onLongPress(e.nativeEvent); // 執行長按行為
        clear(); // 重置
      }, delay);
    },
    [delay, onLongPress, clear],
  );

  const move = useCallback(
    (e) => {
      if (!isPressing || !startPosRef.current) return;
      const dx = e.clientX - startPosRef.current.x;
      const dy = e.clientY - startPosRef.current.y;
      if (Math.hypot(dx, dy) > moveTolerance) clear();
    },
    [isPressing, moveTolerance, clear],
  );

  const clear = useCallback(() => {
    if (timerIdRef.current !== null)
      window.clearTimeout(timerIdRef.current);
    timerIdRef.current = null;
    setIsPressing(false);
    startPosRef.current = null;
  }, []);

  return {
    isPressing,
    pointerProps: {
      onPointerDown: start,
      onPointerUp: clear,
      onPointerCancel: clear,
      onPointerLeave: clear,
      onPointerMove: move,
    },
  };
}
