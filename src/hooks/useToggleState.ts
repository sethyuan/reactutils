import { useCallback } from "react"
import { useStateRef } from "./useStateRef"

export function useToggleState() {
  const [stateRef, setState] = useStateRef(false)

  const toggle = useCallback(() => {
    setState(!stateRef.current)
  }, [])

  return [stateRef.current, toggle] as const
}
