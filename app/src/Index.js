import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import App from './components/App'

const render = (Root) => {
  /* ReactDOM.render(
    <BrowserRouter>
      Root
    </BrowserRouter>,
    document.getElementById('root')
  ) */
  ReactDOM.render(Root, document.getElementById('root'))
}

if (module.hot) {
  module.hot.accept()
}

render(<App />)
