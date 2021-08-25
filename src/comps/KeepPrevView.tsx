import React, {
  cloneElement,
  ComponentType,
  Key,
  memo,
  ReactElement,
} from "react"
import { usePrev } from "../hooks/usePrev"

export type Props = {
  kpvid: Key
  component?: ComponentType<any>
  render?: (props: { [key: string]: any }) => ReactElement
  [key: string]: any
}

export const KeepPrevView = memo(
  ({ kpvid, component, render, ...others }: Props) => {
    const prevId = usePrev(kpvid)
    const prevPrevId = usePrev(prevId)

    const Comp = component!
    const jsx = render ? (
      render({ restored: kpvid === prevPrevId, ...others })
    ) : (
      <Comp restored={kpvid === prevPrevId} {...others} />
    )

    const prevJsx = usePrev(jsx)

    return (
      <>
        <div key={prevId} style={{ display: "none" }}>
          {prevJsx === undefined
            ? prevJsx
            : cloneElement(prevJsx, { restored: false })}
        </div>
        <div key={kpvid}>{jsx}</div>
      </>
    )
  },
  (prev, next) => prev.kpvid === next.kpvid,
)

KeepPrevView.displayName = "KeepPrevView"
