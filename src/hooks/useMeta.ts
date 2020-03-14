import { useEffect, useState, useCallback } from "react"

export type UseMetaType<T> = {
  loading: boolean
  data?: T
  error?: { [key: string]: any }
  refetch: () => void
}

type State<T> = {
  loading: boolean
  data?: T
  error?: { [key: string]: any }
}

export function useMeta<T>(
  fn: () => Promise<T>,
  deps?: React.DependencyList,
): UseMetaType<T> {
  const [{ loading, data, error }, setState] = useState<State<T>>({
    loading: true,
    data: undefined,
    error: undefined,
  })

  const refetch = useCallback(async () => {
    setState({ loading: true, data, error })
    try {
      const data = await fn()
      setState({ loading: false, data, error: undefined })
    } catch (err) {
      setState({ loading: false, data: undefined, error: err })
    }
  }, [fn])

  useEffect(() => {
    refetch()
  }, deps)

  return { loading, data, error, refetch }
}
