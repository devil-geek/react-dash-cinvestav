import React, {Component} from 'react'
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

export default App
