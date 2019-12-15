import { useRef, MutableRefObject } from "react"
import { useForceUpdate } from "./useForceUpdate"

export function useStateRef<T>(
  initializer: T,
): [MutableRefObject<T>, (v: T) => void] {
  const stateRef = useRef<T | undefined>(undefined)
  const forceUpdate = useForceUpdate()

  if (stateRef.current === undefined) {
    if (typeof initializer === "function") {
      stateRef.current = initializer()
    } else {
      stateRef.current = initializer
    }
  }

  function setState(v: any) {
    if (typeof v === "function") {
      const updater = v
      stateRef.current = updater(stateRef.current)
    } else {
      stateRef.current = v
    }
    forceUpdate()
  }

  return [stateRef as MutableRefObject<T>, setState]
}
