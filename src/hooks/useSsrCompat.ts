import { useCallback, useEffect, useState } from "react"
import { useDependentState } from "./useDependentState"

/**
 * Provides a render function that delays 1 rendering cycle to make
 * rendering consistent with SSR. You can use this it to delay the whole
 * or just part of your rendering. A `rendered` is also provided if you
 * need to know when DOM is actually bound and usable.
 *
 * ```js
 * function MyComp() {
 *   const [compatRender] = useSsrCompat()
 *
 *   return (
 *     <div>
 *       {compatRender(() => (
 *         <div style={{width: `${document.body.clientWidth}px`}} />
 *       ))}
 *     </div>
 *   )
 * }
 * ```
 */
export function useSsrCompat() {
  const [mounted, setMounted] = useState(false)
  const [rendered] = useDependentState(() => mounted, [mounted])

  useEffect(() => {
    setMounted(true)
  }, [])

  return [
    useCallback((render: () => any) => (mounted ? render() : null), [mounted]),
    rendered,
  ] as const
}
