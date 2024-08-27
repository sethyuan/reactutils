import { useCallback, useRef } from "react"

/**
 * Handles the composition events for IME input and provides an unified
 * callback.
 */
export function useCompositionChange(
  callback: (
    e: React.ChangeEvent | React.CompositionEvent,
    ...others: any
  ) => void,
) {
  const isComposing = useRef(false)

  const onChange = useCallback(
    (e: React.ChangeEvent, ...others: any) => {
      if (isComposing.current) return
      callback(e, ...others)
    },
    [callback],
  )

  const onCompositionStart = useCallback((_e: React.CompositionEvent) => {
    isComposing.current = true
  }, [])

  const onCompositionEnd = useCallback(
    (e: React.CompositionEvent, ...others: any) => {
      isComposing.current = false
      if (!e.data) return
      callback(e, ...others)
    },
    [callback],
  )

  return { onChange, onCompositionStart, onCompositionEnd }
}
