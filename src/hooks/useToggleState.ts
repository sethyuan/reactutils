import { useCallback } from "react"
import { useStateRef } from "./useStateRef"

export function useToggleState(): [boolean, () => void] {
  const [stateRef, setState] = useStateRef(false)

  const toggle = useCallback(() => {
    setState(!stateRef.current)
  }, [])

  return [stateRef.current, toggle]
}
