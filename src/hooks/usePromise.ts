import { useCallback, useEffect, useRef } from "react"

interface CancellablePromise<T> {
  promise: Promise<T>
  cancel: () => void
}

function makeCancellableImpl<T>(
  promise: Promise<T>,
  callback: (promise: Promise<T>) => void,
): CancellablePromise<T> {
  let isCanceled = false

  return {
    promise: new Promise<T>((resolve, reject) => {
      promise.then(
        (val) => {
          callback(promise)
          if (isCanceled) {
            const err = new Error("canceled")
            err.name = "CanceledPromiseError"
            reject(err)
          } else {
            resolve(val)
          }
        },
        (err) => {
          callback(promise)
          if (isCanceled) {
            const err = new Error("canceled")
            err.name = "CanceledPromiseError"
            reject(err)
          } else {
            reject(err)
          }
        },
      )
    }),

    cancel() {
      isCanceled = true
    },
  }
}

/**
 * Provides mechanisms to cancel promises, also ensures all promises created
 * through this mechanism are canceled when component is unmounted.
 *
 * ```js
 * const [makeCancellable, cancelPromise] = usePromise()
 *
 * useEffect(() => {
 *   ;(async () => {
 *     // promise is automatically canceled if component is unmounted
 *     // before it's resolved.
 *     const dataPromise = makeCancellable(getData())
 *     if (necessary) {
 *       cancelPromise(dataPromise)
 *     }
 *     try {
 *       const data = await dataPromise
 *       // use data
 *     } catch(err) {
 *       if (err.name === "CanceledPromiseError") {
 *         // ignore
 *       }
 *     }
 *   })()
 * }, [])
 * ```
 */
export function usePromise() {
  const promisesRef = useRef<CancellablePromise<any>[]>([])
  const promises = promisesRef.current

  const removePromise = useCallback(
    <T>(promise: Promise<T>) => {
      const index = promises.findIndex((p) => p.promise === promise)
      if (index >= 0) {
        promises.splice(index, 1)
      }
    },
    [promises],
  )

  const makeCancellable = useCallback(
    <T = any>(promise: Promise<T>) => {
      const cancellable = makeCancellableImpl(promise, removePromise)
      promises.push(cancellable)
      return cancellable.promise
    },
    [promises],
  )

  const cancelPromise = useCallback(
    <T = any>(promise: Promise<T>) => {
      for (const p of promises) {
        if (p.promise === promise) {
          p.cancel()
          break
        }
      }
    },
    [promises],
  )

  useEffect(() => {
    return () => {
      for (const p of promises) {
        p.cancel()
      }
    }
  }, [])

  return [makeCancellable, cancelPromise] as const
}
