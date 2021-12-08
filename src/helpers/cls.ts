/**
 * Join your classes for a component, any non-string values will be excluded.
 *
 * ```js
 * const level = 1
 * const visible = false
 * let dynamicClassName
 *
 * <MyComp
 *   className={cls(
 *     "container",
 *     `level-${level}`,
 *     visible && "visible",
 *     dynamicClassName,
 *   )}
 * />
 *
 * // Will be <MyComp className="container level-1" />
 * ```
 */
export function cls(...classes: any[]) {
  return (
    classes.filter((c) => typeof c === "string" && c !== "").join(" ") ||
    undefined
  )
}
