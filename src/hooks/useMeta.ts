import { useEffect, useState } from "react"

export type UseMetaType = {
  loading: boolean
  data: any
  error: { [key: string]: any } | null | undefined
}

export function useMeta(
  fn: () => Promise<any>,
  deps?: React.DependencyList,
): UseMetaType {
  const [{ loading, data, error }, setState] = useState<UseMetaType>({
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
