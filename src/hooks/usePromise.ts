import { useCallback, useEffect } from "react"

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
    promise: new Promise((resolve, reject) => {
      promise.then(
        (val) => {
          if (isCanceled) {
            reject(new Error("canceled"))
          } else {
            resolve(val)
          }
          callback(promise)
        },
        (err) => {
          if (isCanceled) {
            reject(new Error("canceled"))
          } else {
            reject(err)
          }
          callback(promise)
        },
      )
    }),

    cancel() {
      isCanceled = true
    },
  }
}

export function usePromise() {
  let promises: CancellablePromise<any>[] = []

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
      promises = []
    }
  }, [])

  return [makeCancellable, cancelPromise] as const
}
