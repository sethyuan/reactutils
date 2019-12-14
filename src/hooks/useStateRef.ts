import { useRef } from "react"
import { useForceUpdate } from "./useForceUpdate"

export function useStateRef(initializer: any) {
  const stateRef = useRef(undefined)
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

  return [stateRef, setState]
}
