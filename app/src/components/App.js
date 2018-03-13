import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import styles from './App.scss'
import Dummy from './Dummy'

class App extends Component {
  render () {
    return (
      <div>
        <h1 className={styles.miclase}>Hello World! </h1>
        <Dummy />
      </div>
    )
  }
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
)
