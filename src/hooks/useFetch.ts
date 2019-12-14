import React, { useEffect, useState } from "react"

type UseFetchType = {
  loading: boolean
  data: object | null | undefined
  error: object | null | undefined
}

export function useFetch(
  input: RequestInfo,
  init?: RequestInit,
  deps?: React.DependencyList,
) {
  const [{ loading, data, error }, setState] = useState<UseFetchType>({
    loading: false,
    data: null,
    error: null,
  })

  useEffect(() => {
    ;(async () => {
      const req = fetch(input, init)
      setState({ loading: true, data, error })
      try {
        const res = await req
        setState({ loading: false, data: res.body, error: null })
      } catch (err) {
        setState({ loading: false, data, error: err })
      }
    })()
  }, deps)

  return [loading, data, error]
}
