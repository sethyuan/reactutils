import { useCallback, useState } from "react"

export function useForceUpdate() {
  const [, setState] = useState<{} | undefined>()
  const forceUpdate = useCallback(() => setState({}), [])
  return forceUpdate
}
