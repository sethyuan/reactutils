import React from "react"
import { displayName } from "./utils"

export default function autoDisabled(Comp) {
  class AutoDisabled extends React.Component {
    static displayName = `AutoDisabled(${displayName(Comp)})`

    state = {
      disabled: false,
      duringClick: false,
    }

    render() {
      return (
        <Comp
          {...this.props}
          disabled={
            this.props.disabled === undefined
              ? this.state.disabled
              : this.props.disabled
          }
          duringClick={
            this.props.duringClick === undefined
              ? this.state.duringClick
              : this.props.duringClick
          }
          onClick={this.onClick}
        />
      )
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

  // copy all static members except `displayName` and
  // `getDerivedStateFromProps`
  /* eslint-disable */
  const {
    displayName: ignored,
    getDerivedStateFromProps,
    childContextTypes,
    ...members
  } = Comp
  /* eslint-enable */
  Object.assign(AutoDisabled, members)

  return AutoDisabled
}
