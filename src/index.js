// @flow
/* eslint-env browser */
import React from 'react'
import ReactDOM from 'react-dom'

import { App } from './components'

// $FlowIgnore
import './index.less'

const mount: HTMLElement | null = document.getElementById('mount')
const render = () => {
  if (!mount) {
    console.error('No mountpoint found!')
    return
  }

  ReactDOM.render(<App />, mount)
}

render()

// $FlowIgnore
if (module.hot) {
  // $FlowIgnore
  module.hot.accept('./components', render)
}
