import { useState, useRef, useEffect, useCallback } from "react"

export default function AutoDisabled(props) {
  const [state, setState] = useState({
    disabled: false,
    duringClick: false,
  })
  const mountedRef = useRef(false)

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  const disabled =
    props.disabled === undefined ? state.disabled : props.disabled

  const duringClick =
    props.duringClick === undefined ? state.duringClick : props.duringClick

  const onClick = useCallback(
    async (...args) => {
      if (props.onClick) {
        setState({ disabled: true, duringClick: true })
        try {
          await props.onClick(...args)
        } finally {
          if (mountedRef.current) {
            setState({ disabled: false, duringClick: false })
          }
        }
      }
    },
    [props.onClick],
  )

  return props.children(disabled, onClick, duringClick)
}
