import { useCallback, useRef, useState } from "react"

export function useWaitedAction(fn?: (...args: any) => void | Promise<void>) {
  const [_duringAction, setDuringAction] = useState(false)

  const state = useRef({
    calling: false,
    usedDuringAction: false,
  })

  const action = useCallback(
    async (...args: any) => {
      if (!state.current.calling) {
        state.current.calling = true
        if (state.current.usedDuringAction) {
          setDuringAction(true)
        }
        try {
          await fn?.(...args)
        } finally {
          if (state.current.usedDuringAction) {
            setDuringAction(false)
          }
          state.current.calling = false
        }
      }
    },
    [fn],
  )

  if (fn == null) return { action: undefined, duringAction: false }

  return {
    action,
    get duringAction() {
      state.current.usedDuringAction = true
      return _duringAction
    },
  }
}
