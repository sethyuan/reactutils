import { useCallback, useState } from "react"

/**
 * Gives you a function that when called, causes a re-render.
 */
export function useForceUpdate() {
  const [, setState] = useState<{}>()
  const forceUpdate = useCallback(() => setState({}), [])
  return forceUpdate
}
