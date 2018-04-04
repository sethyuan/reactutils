import React from "react"
import { displayName } from "./utils"

export default function autoDisabled(Comp) {
  return class AutoDisabled extends React.Component {
    static displayName = `AutoDisabled(${displayName(Comp)})`

    state = {
      disabled: false,
      duringClick: false,
    }

    render() {
      return (
        <Comp
          {...this.props}
          disabled={this.props.disabled || this.state.disabled}
          duringClick={this.state.duringClick}
          onClick={this.onClick}
        />
      )
    }

    onClick = () => {
      if (this.props.onClick) {
        this.setState({ disabled: true, duringClick: true }, async () => {
          try {
            await this.props.onClick()
          } finally {
            this.setState({ disabled: false, duringClick: false })
          }
        })
      }
    }
  }
}
