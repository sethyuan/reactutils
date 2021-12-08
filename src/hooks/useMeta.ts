import { DependencyList, useCallback, useEffect, useRef, useState } from "react"

/**
 * Giving a function that returns a value or promise, this hook provides
 * some extra metadata for users to use. Metadata is only computed if you
 * used it, therefore, any not used metadata will not affect your component's
 * rendering.
 */
export function useMeta<T>(fn: () => T | Promise<T>, deps?: DependencyList) {
  const [_loading, setLoading] = useState(true)
  const [_data, setData] = useState<T>()
  const [_error, setError] = useState<any>()

  const state = useRef({
    usedLoading: false,
    usedData: false,
    usedError: false,
  })

  const refetch = useCallback(async () => {
    if (state.current.usedLoading) {
      setLoading(true)
    }
    try {
      const ret = await fn()
      if (state.current.usedLoading) {
        setLoading(false)
      }
      if (state.current.usedData) {
        setData(ret)
      }
      if (state.current.usedError) {
        setError(undefined)
      }
    } catch (err) {
      if (state.current.usedLoading) {
        setLoading(false)
      }
      if (state.current.usedData) {
        setData(undefined)
      }
      if (state.current.usedError) {
        setError(err)
      }
    }
  }, [fn])

  useEffect(() => {
    refetch()
  }, deps)

  return {
    get loading() {
      state.current.usedLoading = true
      return _loading
    },
    get data() {
      state.current.usedData = true
      return _data
    },
    get error() {
      state.current.usedError = true
      return _error
    },
    refetch,
  }
}
