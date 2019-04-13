import { useState, useRef, useEffect, useCallback } from "react"

export default function AutoDisabled(props) {
  const [state, setState] = useState({
    disabled: false,
    duringClick: false,
    args: null,
  })
  const mountedRef = useRef(false)

  useEffect(() => {
    mountedRef.current = true

    if (state.duringClick && props.onClick) {
      ;(async () => {
        try {
          await props.onClick(state.args)
        } finally {
          if (mountedRef.current) {
            setState({ disabled: false, duringClick: false, args: null })
          }
        }
      })()
    }

    return () => {
      mountedRef.current = false
    }
  })

  const disabled =
    props.disabled === undefined ? state.disabled : props.disabled

  const duringClick =
    props.duringClick === undefined ? state.duringClick : props.duringClick

  const onClick = useCallback((...args) => {
    setState({ disabled: true, duringClick: true, args })
  }, [])

  return props.children(disabled, onClick, duringClick)
}
