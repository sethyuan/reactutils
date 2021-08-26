import { useRef } from "react"
import { useForceUpdate } from "./useForceUpdate"

function isInitFunc<T>(x: T | (() => T)): x is () => T {
  return typeof x === "function"
}

function isUpdaterFunc<T>(
  state: T | ((prevState: T) => T),
): state is (prevState: T) => T {
  return typeof state === "function"
}

export function useStateRef<T>(initializer: T | (() => T)) {
  const stateRef = useRef<T>()
  const forceUpdate = useForceUpdate()

  if (stateRef.current === undefined) {
    if (isInitFunc(initializer)) {
      stateRef.current = initializer()
    } else {
      stateRef.current = initializer
    }
  }

  function setState(state: T | ((prevState: T) => T)) {
    if (isUpdaterFunc(state)) {
      const updater = state
      stateRef.current = updater(stateRef.current!)
    } else {
      stateRef.current = state
    }
    forceUpdate()
  }

  return [stateRef, setState] as const
}
