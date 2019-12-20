export function cls(...classes: any[]) {
  return (
    classes.filter((c) => typeof c === "string" && c !== "").join(" ") ||
    undefined
  )
}
