import { useCallback, useEffect, useState } from "react"
import { useDependentState } from "./useDependentState"

export default function useSsrCompat() {
  const [mounted, setMounted] = useState(false)
  const [rendered] = useDependentState(() => mounted, [mounted])

  useEffect(() => {
    setMounted(true)
  }, [])

  return [
    useCallback((render: () => any) => (mounted ? render() : null), [mounted]),
    rendered,
  ] as const
}
