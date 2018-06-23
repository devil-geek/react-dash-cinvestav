import React, {Component} from 'react'
import styles from './App.scss'
import Menu from './Menu'
import Dummy from './Dummy'

class App extends Component {
  render () {
    return (
      <div>
        <Menu />
        <Dummy />
      </div>
    )
  }
}

export default App
