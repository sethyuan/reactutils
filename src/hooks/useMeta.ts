import { useCallback, useEffect, useRef, useState } from "react"

export type UseMetaType<T> = {
  loading: boolean
  data?: T
  error?: { [key: string]: any }
  refetch: () => void
}

export function useMeta<T>(
  fn: () => T | Promise<T>,
  deps?: React.DependencyList,
): UseMetaType<T> {
  const [_loading, setLoading] = useState(true)
  const [_data, setData] = useState<T | undefined>()
  const [_error, setError] = useState<{ [key: string]: any } | undefined>()

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
