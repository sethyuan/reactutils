import React, {
  cloneElement,
  ComponentType,
  memo,
  ReactElement,
  useLayoutEffect,
  useRef,
} from "react"
import { usePrev } from "../hooks/usePrev"

export type KeepViewProps = {
  kvId: string
  kvPrefix: string
  kvComponent?: ComponentType<any>
  kvRender?: (props: any) => ReactElement
  [key: string]: any
}

/**
 * This component keeps the specified (`kvId` that starts with `kvPrefix`)
 * rendered view and its state around so when you switch back to it, no
 * render is required and all of its state are retained. It can optionally
 * retain the scroll offset too.
 *
 * Views are associated and identified by `kvId`. There are 2 ways to
 * render a view, `kvComponent` or `kvRender` function and regardless of
 * what you choose to use, you will receive 2 extra props,
 * `kvRestored` and `kvScrollElementRef`. `kvRestored` tells you whether
 * the view to render is "restored", that is, it was kept as the previous
 * view; `kvScrollElementRef` in the other hand, allows you to "attach" a
 * scrolling DOM element if you want to persist scroll offset.
 *
 * @example
 * ```jsx
 * let view
 *
 * switch (path) {
 * case "/pages/a":
 *   view = <KeepView kvPrefix="/pages/a" kvId="/pages/a" kvComponent={CompA} />
 *   break
 * case "/pages/b":
 *   view = <KeepView kvPrefix="/pages/a" kvId="/pages/b" kvComponent={CompB} />
 *   break
 * case "/pages/c":
 *   view = <KeepView kvPrefix="/pages/a" kvId="/pages/c" kvComponent={CompC} />
 *   break
 * }
 *
 * // CompA
 * function CompA({kvRestored, kvScrollElementRef}) {
 *   useEffect(() => {
 *     kvScrollElementRef.current = document.body
 *   }, [])
 *
 *   useEffect(() => {
 *     if (kvRestored) {
 *       // View is showed up again.
 *     }
 *   }, [kvRestored])
 *
 *   return ...
 * }
 * ```
 */
export const KeepView = memo(
  function KeepView({
    kvId,
    kvPrefix,
    kvComponent,
    kvRender,
    ...others
  }: KeepViewProps) {
    const keptId = useRef<string>()
    const keptJsx = useRef<ReactElement>()
    const prevId = usePrev(kvId)

    const restored = kvId === keptId.current
    if (restored) {
      keptId.current = undefined
      keptJsx.current = undefined
    }

    const shallKeep = !!prevId?.startsWith(kvPrefix)
    const scrollElementRef = useScrollRestore(shallKeep, restored)

    const Comp = kvComponent!
    const jsx = kvRender ? (
      kvRender({
        kvRestored: restored,
        kvScrollElementRef: scrollElementRef,
        ...others,
      })
    ) : (
      <Comp
        kvRestored={restored}
        kvScrollElementRef={scrollElementRef}
        {...others}
      />
    )
    const prevJsx = usePrev(jsx)

    if (shallKeep) {
      keptId.current = prevId
      keptJsx.current = prevJsx
    }

    return (
      <>
        <div key={keptId.current} style={{ display: "none" }}>
          {keptJsx.current === undefined
            ? undefined
            : cloneElement(keptJsx.current, { kvRestored: false })}
        </div>
        <div key={kvId}>{jsx}</div>
      </>
    )
  },
  (prev, next) => prev.kvId === next.kvId,
)

function useScrollRestore(shallKeep: boolean, restored: boolean) {
  const scrollElementRef = useRef<HTMLElement>()
  const scrollTopRef = useRef<number>()
  const prevScrollTop = usePrev(scrollElementRef.current?.scrollTop)

  if (shallKeep) {
    scrollTopRef.current = prevScrollTop
  }

  useLayoutEffect(() => {
    if (
      restored &&
      scrollElementRef.current != null &&
      scrollTopRef.current != null
    ) {
      scrollElementRef.current.scrollTop = scrollTopRef.current
    }
  })

  return scrollElementRef
}
