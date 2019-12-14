import { useRef, useEffect } from "react"

function getGlobal() {
  let g = undefined

  try {
    g = window
    return g
  } catch (e) {
    // ignore, try next
  }

  try {
    g = global
    return g
  } catch (e) {
    // ignore, try next
  }

  return g
}

const win: any = getGlobal()

export function useTimers() {
  const idsRef = useRef<any>({})
  const methodsRef = useRef<any>({})
  const ids = idsRef.current
  const methods = methodsRef.current

  if (methods.setTimeout == null) {
    ;[
      ["setTimeout", "clearTimeout"],
      ["setInterval", "clearInterval"],
      ["setImmediate", "clearImmediate"],
      ["requestAnimationFrame", "cancelAnimationFrame"],
    ].forEach(([f, cf]) => {
      methods[f] = (...args: any[]) => {
        const id = win[f](...args)
        if (!ids[f]) {
          ids[f] = new Set()
        }
        ids[f].add(id)
        return id
      }

      methods[cf] = (id) => {
        win[cf](id)
        ids[f]?.delete(id)
      }
    })
  }

  useEffect(() => {
    return () => {
      ;[
        ["setTimeout", "clearTimeout"],
        ["setInterval", "clearInterval"],
        ["setImmediate", "clearImmediate"],
        ["requestAnimationFrame", "cancelAnimationFrame"],
      ].forEach(([f, cf]) => {
        ids[f]?.forEach((id: any) => win[cf](id))
      })
    }
  }, [])

  return methods
}
