import { useCallback, useRef } from "react"

/**
 * Implements a key long press event behavior.
 */
export function useKeyLongPress(
  key: string,
  duration: number,
  callback: () => void,
) {
  const timer = useRef<any>()

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key !== key || timer.current != null) return
      timer.current = setTimeout(callback, duration)
    },
    [key, duration, callback],
  )

  const onKeyUp = useCallback(
    (e: KeyboardEvent) => {
      if (e.key !== key) return
      clearTimeout(timer.current)
      timer.current = null
    },
    [key],
  )

  return { onKeyDown, onKeyUp }
}
