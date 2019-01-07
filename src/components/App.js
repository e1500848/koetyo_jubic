// @flow
import React from 'react'
import { hot } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import reducer from '../reducer'
import { HelloWorld } from './'
import { KoeTyo } from './'

type Props = {}

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
const replace = () => {
  const nextReducer = require('../reducer')
  store.replaceReducer(nextReducer)
}

// $FlowIgnore
if (module.hot) {
  // $FlowIgnore
  module.hot.accept('../reducer', replace)
}

class App extends React.PureComponent<Props> {
  render () {
    return (
      <Provider store={store}>
    {/*<HelloWorld />*/}
        <KoeTyo />
      </Provider>
    )
  }
}

export default hot(module)(App)
