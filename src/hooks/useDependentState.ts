import { DependencyList, useEffect, useState } from "react"

export function useDependentState<T>(updater: () => T, deps: DependencyList) {
  const [value, setValue] = useState(updater)

  useEffect(() => setValue(updater()), deps)

  return [value, setValue] as const
}
