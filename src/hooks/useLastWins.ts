import { useCallback, useRef } from "react"

export function useLastWins<T>() {
  const lastPromise = useRef<Promise<T>>()

  const lastWins = useCallback(async (promise: Promise<T>) => {
    lastPromise.current = promise
    const ret = await promise
    if (lastPromise.current === promise) {
      return ret
    } else {
      const err = new Error("Not the last")
      err.name = "LastWinsError"
      throw err
    }
  }, [])

  return [lastWins] as const
}
