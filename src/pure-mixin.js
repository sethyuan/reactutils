import shallowCompare from "react-addons-shallow-compare"
import {displayName} from "./utils"

export default function pure(Comp) {
  return class PureComp extends Comp {
    static displayName = `${displayName(Comp)}-Pure`

    shouldComponentUpdate(nextProps, nextState) {
      return shallowCompare(this, nextProps, nextState)
    }
  }
}
