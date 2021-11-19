import { DependencyList, useEffect, useState } from "react"

export function useDependentState<T>(
  updater: () => T,
  deps: DependencyList,
  initialState?: T,
) {
  const [value, setValue] = useState(initialState ?? updater)

  useEffect(() => setValue(updater()), deps)

  return [value, setValue] as const
}
