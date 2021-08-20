import React, { ComponentType, memo } from "react"
import { usePrev } from "../hooks/usePrev"

type Props = {
  id: any
  component: ComponentType
  [key: string]: any
}

export const KeepPrevView = memo(
  ({ id, component, ...others }: Props) => {
    const Comp = component
    const jsx = <Comp {...others} />

    const prevId = usePrev(id)
    const prevJsx = usePrev(jsx)

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
