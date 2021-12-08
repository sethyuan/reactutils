import { useCallback, useRef } from "react"

/**
 * You can use this hook to throw away intermediate promises, e.g., you have
 * an auto completed input that when typing, loads the autocompletion data
 * dynamically, naturally, you'll only want to use the data of the last typing,
 * all other data should be discarded and not used.
 *
 * ```js
 * const [lastTypingWins] = useLastWins()
 *
 * async function onInput(e) {
 *   try {
 *     const data = await lastTypingWins(getData(e.target.value))
 *     // this promise won, use data.
 *   } catch (err) {
 *     if (err.name === "LastWinsError") {
 *       // this promised failed to win, you probably should ignore it.
 *     }
 *   }
 * }
 * ```
 */
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
