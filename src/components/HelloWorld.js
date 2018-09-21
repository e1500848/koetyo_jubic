// @flow
import React from 'react'
import { connect } from 'react-redux'

import { setText } from '../actions'

import type { Dispatch } from 'redux'

import type { ApplicationState } from '../reducer'

type Props = {
  text: string,
  dispatch: Dispatch
}

class HelloWorld extends React.PureComponent<Props> {
  _toggleText = () => {
    const { text, dispatch } = this.props
    const newText = text.length === 0 ? 'World' : ''

    dispatch(setText(newText))
  }

  render () {
    const { text } = this.props

    return (
      <React.Fragment>
        <h1>Hello {text}</h1>
        <button onClick={this._toggleText}>Click Me!</button>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  text: state.text
})

export default connect(mapStateToProps)(HelloWorld)
