import React, { ComponentType, Key, memo, useEffect } from "react"
import { usePrev } from "../hooks/usePrev"

export type Props = {
  id: any
  component: ComponentType<any>
  onRestore?: (key: Key) => void
  [key: string]: any
}

export const KeepPrevView = memo(
  ({ id, component, onRestore, ...others }: Props) => {
    const Comp = component
    const jsx = <Comp onRestore={onRestore} {...others} />

    const prevId = usePrev(id)
    const prevPrevId = usePrev(prevId)
    const prevJsx = usePrev(jsx)

    useEffect(() => {
      if (id === prevPrevId) {
        onRestore?.(id)
      }
    }, [id, prevPrevId])

    return (
      <>
        <div key={prevId} style={{ display: "none" }}>
          {prevJsx}
        </div>
        <div key={id}>{jsx}</div>
      </>
    )
  },
  (prev, next) => prev.id === next.id,
)

KeepPrevView.displayName = "KeepPrevView"
