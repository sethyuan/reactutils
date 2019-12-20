import { useEffect, useState } from "react"

export function useDependentState<T>(
  updater: () => T,
  deps: React.DependencyList,
) {
  const [value, setValue] = useState(updater)

  useEffect(() => setValue(updater()), deps)

  return [value, setValue] as const
}
