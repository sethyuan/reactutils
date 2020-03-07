import { useEffect, useState } from "react"

export type UseMetaType<T> = {
  loading: boolean
  data: T | null
  error: { [key: string]: any } | null | undefined
}

export function useMeta<T>(
  fn: () => Promise<T>,
  deps?: React.DependencyList,
): UseMetaType<T> {
  const [{ loading, data, error }, setState] = useState<UseMetaType<T>>({
    loading: false,
    data: null,
    error: null,
  })

  useEffect(() => {
    ;(async () => {
      setState({ loading: true, data, error })
      try {
        const data = await fn()
        setState({ loading: false, data, error: null })
      } catch (err) {
        setState({ loading: false, data, error: err })
      }
    })()
  }, deps)

  return { loading, data, error }
}
