import { useRef, useEffect } from "react"

export function usePrev<T>(val: T) {
  const prevRef = useRef<T>()

  useEffect(() => {
    prevRef.current = val
  })

  return prevRef.current
}
