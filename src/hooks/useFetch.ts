import { useMeta, UseMetaType } from "./useMeta"

export function useFetch(
  input: RequestInfo,
  init?: RequestInit,
  deps?: React.DependencyList,
): UseMetaType {
  return useMeta(async () => {
    const res = await fetch(input, init)
    return res.body
  }, deps)
}
