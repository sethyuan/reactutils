import { useCallback, useRef } from "react"

/**
 * Handles the composition events for IME input and provides an unified
 * callback.
 */
export function useCompositionChange(
  callback: (e: InputEvent | CompositionEvent) => void,
) {
  const isComposing = useRef(false)

  const onChange = useCallback(
    (e: InputEvent) => {
      if (isComposing.current) return
      callback(e)
    },
    [callback],
  )

  const onCompositionStart = useCallback((e: CompositionEvent) => {
    isComposing.current = true
  }, [])

  const onCompositionEnd = useCallback(
    (e: CompositionEvent) => {
      isComposing.current = false
      if (!e.data) return
      callback(e)
    },
    [callback],
  )

  return { onChange, onCompositionStart, onCompositionEnd }
}
