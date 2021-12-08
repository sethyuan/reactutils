import { DependencyList, useEffect, useState } from "react"

/**
 * Creates a state and keeps it updated everytime its deps changes, however
 * this update happens 1 cycle later than its deps. If this late update is not
 * what you're looking for, `useMemo` or a simple expression is what you need.
 */
export function useDependentState<T>(
  updater: () => T,
  deps: DependencyList,
  initialState?: T,
) {
  const [value, setValue] = useState(initialState ?? updater)

  useEffect(() => setValue(updater()), deps)

  return [value, setValue] as const
}
