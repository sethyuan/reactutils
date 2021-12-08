import { useRef } from "react"
import { useForceUpdate } from "./useForceUpdate"

/**
 * It works like `useState`, but the state is kept with a ref instead.
 * It is provided to facilitate tracking state changes in timers and
 * other similar situations. It differs from `useRef` in that it does
 * trigger re-render upon set and it can accept a function initializer
 * just like `useState`.
 *
 * ```js
 * const [countRef, setCount] = useStateRef(0)
 *
 * useEffect(() => {
 *   setTimeout(() => {
 *     console.log(countRef.current)
 *   }, 1000)
 *   setCount(v => v + 1) // trigger a re-render
 * }, [])
 * ```
 */
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

function isInitFunc<T>(x: T | (() => T)): x is () => T {
  return typeof x === "function"
}

function isUpdaterFunc<T>(
  state: T | ((prevState: T) => T),
): state is (prevState: T) => T {
  return typeof state === "function"
}
