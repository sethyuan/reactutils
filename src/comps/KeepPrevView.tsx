import React, {
  cloneElement,
  ComponentType,
  Key,
  memo,
  ReactElement,
  useLayoutEffect,
  useRef,
} from "react"
import { usePrev } from "../hooks/usePrev"

export type Props = {
  kpvId: Key
  kpvComponent?: ComponentType<any>
  kpvRender?: (props: any) => ReactElement
  [key: string]: any
}

export const KeepPrevView = memo(
  ({ kpvId, kpvComponent, kpvRender, ...others }: Props) => {
    const prevId = usePrev(kpvId)
    const prevPrevId = usePrev(prevId)

    const restored = kpvId === prevPrevId

    const scrollElementRef = useScrollRestore(restored)

    const Comp = kpvComponent!
    const jsx = kpvRender ? (
      kpvRender({
        kpvRestored: restored,
        kpvScrollElementRef: scrollElementRef,
        ...others,
      })
    ) : (
      <Comp
        kpvRestored={restored}
        kpvScrollElementRef={scrollElementRef}
        {...others}
      />
    )
    const prevJsx = usePrev(jsx)

    return (
      <>
        <div key={prevId} style={{ display: "none" }}>
          {prevJsx === undefined
            ? prevJsx
            : cloneElement(prevJsx, { restored: false })}
        </div>
        <div key={kpvId}>{jsx}</div>
      </>
    )
  },
  (prev, next) => prev.kpvId === next.kpvId,
)

KeepPrevView.displayName = "KeepPrevView"

function useScrollRestore(restored: boolean) {
  const scrollElementRef = useRef<HTMLElement>()
  const prevScrollElement = usePrev(scrollElementRef.current)
  const scrollTopRef = useRef<number>()
  scrollTopRef.current = scrollElementRef.current?.scrollTop
  const prevScrollTop = usePrev(scrollTopRef.current)

  useLayoutEffect(() => {
    if (restored && prevScrollElement != null && prevScrollTop != null) {
      prevScrollElement.scrollTop = prevScrollTop
    }
  })

  return scrollElementRef
}
