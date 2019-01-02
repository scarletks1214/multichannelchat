import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import configureStore from './configureStore'
import App from './App'
import 'jquery/src/jquery';
import './i18n';

const store = configureStore()
//store.subscribe(() => console.log('state', store.getState()));

const Component = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

let render = () => {
  ReactDOM.render(<Component />, document.getElementById('root'))
}
render()
if (module.hot) {
  module.hot.accept(Component => {
    render()
  })
}
