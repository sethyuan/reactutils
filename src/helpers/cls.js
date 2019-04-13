export default function cls(...classes) {
  return (
    classes.filter((c) => typeof c === "string" && c !== "").join(" ") || null
  )
}
