import { useCallback, useRef, useState } from "react"

export interface WaitedActionReturn {
  action?: (...args: any[]) => Promise<void>
  readonly duringAction: boolean
}

export function useWaitedAction(
  fn?: (...args: any) => void | Promise<void>,
): WaitedActionReturn {
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
