import React from "react"

class AutoDisabled extends React.Component {
  state = {
    disabled: false,
    duringClick: false,
  }

  render() {
    const disabled =
      this.props.disabled === undefined
        ? this.state.disabled
        : this.props.disabled

    const duringClick =
      this.props.duringClick === undefined
        ? this.state.duringClick
        : this.props.duringClick

    return this.props.children(disabled, this.onClick, duringClick)
  }

  componentDidMount() {
    this.mounted = true
  }

  componentWillUnmount() {
    this.mounted = false
  }

  onClick = (...args) => {
    if (this.props.onClick) {
      this.setState({ disabled: true, duringClick: true }, async () => {
        try {
          await this.props.onClick(...args)
        } finally {
          if (this.mounted) {
            this.setState({ disabled: false, duringClick: false })
          }
        }
      })
    }
  }
}

export default AutoDisabled
