import React from "react"
import { displayName } from "./utils"

export default function autoDisabled(Comp) {
  return class AutoDisabled extends React.Component {
    static displayName = `AutoDisabled(${displayName(Comp)})`

    state = {
      disabled: false,
    }

    render() {
      return (
        <Comp
          disabled={this.state.disabled}
          {...this.props}
          onClick={this.onClick}
        />
      )
    }

    onClick = () => {
      if (this.props.onClick) {
        this.setState({ disabled: true }, async () => {
          try {
            await this.props.onClick()
          } finally {
            this.setState({ disabled: false })
          }
        })
      }
    }
  }
}
