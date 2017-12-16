import React from "react"
import { displayName } from "./utils"

export default function propReduce(reducers, props, initialValue) {
  return Comp => {
    return class PropReduce extends React.Component {
      static displayName = `PropReduce(${displayName(Comp)})`

      render() {
        const propObjs = props.map(prop => this.props[prop])
        const newProps = {}

        for (let prop of Object.keys(reducers)) {
          newProps[prop] = propObjs.reduce(reducers[prop], initialValue)
        }

        return <Comp {...this.props} {...newProps} />
      }
    }
  }
}
