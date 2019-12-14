import { useRef, useEffect } from "react"

export function usePrev(val: any) {
  const prevRef = useRef()

  useEffect(() => {
    prevRef.current = val
  })

  return prevRef.current
}
