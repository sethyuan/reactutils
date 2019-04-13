import { useRef, useEffect } from "react"

export default function usePrev(val) {
  const prevRef = useRef()

  useEffect(() => {
    prevRef.current = val
  })

  return prevRef.current
}
