import { useRef } from "react"
import useForceUpdate from "./forceUpdate"

export default function useStateRef(initializer) {
  const stateRef = useRef(undefined)
  const forceUpdate = useForceUpdate()

  if (stateRef.current === undefined) {
    if (typeof initializer === "function") {
      stateRef.current = initializer()
    } else {
      stateRef.current = initializer
    }
  }

  function setState(v) {
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
