import React, { useEffect, useState } from "react"

export function useDependentState<T>(
  updater: () => T,
  deps: React.DependencyList,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState(updater)

  useEffect(() => setValue(updater()), deps)

  return [value, setValue]
}
