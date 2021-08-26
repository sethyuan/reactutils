import { useCallback, useState } from "react"

export function useForceUpdate() {
  const [, setState] = useState<{}>()
  const forceUpdate = useCallback(() => setState({}), [])
  return forceUpdate
}
