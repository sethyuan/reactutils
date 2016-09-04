import shallowCompare from "react-addons-shallow-compare"

export default function pure(Comp) {
  return class PureComp extends Comp {
    static displayName = comp.displayName || comp.name || "Component"

    shouldComponentUpdate(nextProps, nextState) {
      return shallowCompare(this, nextProps, nextState)
    }
  }
}
