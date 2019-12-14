import { useReducer } from "react"

export function useForceUpdate() {
  const [, forceUpdate] = useReducer((x) => !x, false)

  return forceUpdate as () => void
}
