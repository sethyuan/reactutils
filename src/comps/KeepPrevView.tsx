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

export type KeepPrevViewProps = {
  kpvId: Key
  kpvComponent?: ComponentType<any>
  kpvRender?: (props: any) => ReactElement
  [key: string]: any
}

/**
 * This component keeps the previous rendered view and its state around
 * so when you switch back to it, no render is required and all of its
 * state are retained. It can optionally retain the scroll offset too.
 *
 * Views are associated and identified by `kpvId`. There are 2 ways to
 * render a view, `kpvComponent` or `kpvRender` function and regardless of
 * what you choose to use, you will receive 2 extra props,
 * `kpvRestored` and `kpvScrollElementRef`. `kpvRestored` tells you whether
 * the view to render is "restored", that is, it was kept as the previous
 * view; `kpvScrollElementRef` in the other hand, allows you to "attach" a
 * scrolling DOM element if you want to persist scroll offset.
 *
 * @example
 * ```jsx
 * let view
 *
 * switch (path) {
 * case "/pages/a":
 *   view = <KeepPrevView kpvId="/pages/a" kpvComponent={CompA} />
 *   break
 * case "/pages/b":
 *   view = <KeepPrevView kpvId="/pages/b" kpvComponent={CompB} />
 *   break
 * }
 *
 * // CompA
 * function CompA({kpvRestored, kpvScrollElementRef}) {
 *   useEffect(() => {
 *     kpvScrollElementRef.current = document.body
 *   }, [])
 *
 *   useEffect(() => {
 *     if (kpvRestored) {
 *       // View is showed up again.
 *     }
 *   }, [kpvRestored])
 *
 *   return ...
 * }
 * ```
 */
export const KeepPrevView = memo(
  function KeepPrevView({
    kpvId,
    kpvComponent,
    kpvRender,
    ...others
  }: KeepPrevViewProps) {
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
            ? undefined
            : cloneElement(prevJsx, { kpvRestored: false })}
        </div>
        <div key={kpvId}>{jsx}</div>
      </>
    )
  },
  (prev, next) => prev.kpvId === next.kpvId,
)

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
