import React, { ComponentType, memo, ReactElement } from "react"
import { usePrev } from "../hooks/usePrev"

export type Props = {
  id: any
  component?: ComponentType<any>
  render?: (args: { [key: string]: any }) => ReactElement
  [key: string]: any
}

export const KeepPrevView = memo(
  ({ id, component, render, ...others }: Props) => {
    const prevId = usePrev(id)
    const prevPrevId = usePrev(prevId)

    const Comp = component!
    const jsx = render ? (
      render({ restored: id === prevPrevId, ...others })
    ) : (
      <Comp restored={id === prevPrevId} {...others} />
    )

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
