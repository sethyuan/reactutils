export function cls(...classes) {
  return (
    classes.filter(c => typeof c === "string" && c !== "").join(" ") || null
  )
}

export function displayName(Comp) {
  return Comp.displayName || Comp.name || "Component"
}
