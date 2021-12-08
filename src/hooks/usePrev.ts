import { useEffect, useRef } from "react"

/**
 * This hooks allows you to track a value across renderings.
 * It keeps the value during the last rendering or `undefined` if there
 * is no last rendering.
 *
 * Note you can combine multiple uses of this hook if you want to keep
 * history steps deeper, as you can see in the following example.
 *
 * ```js
 * const prevA = usePrev(a)
 * const prevPrevA = usePrev(prevA)
 * ```
 */
export function usePrev<T>(val: T) {
  const prevRef = useRef<T>()

  useEffect(() => {
    prevRef.current = val
  })

  return prevRef.current
}
