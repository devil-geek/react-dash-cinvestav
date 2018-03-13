import React, { Component } from 'react'
import styles from './Dummy.scss'
import axios from 'axios'

class Dummy extends Component {
  async getData () {
    try {
      const res = await axios('http://localhost:3000')
      const data = res.data
      console.log(
        data
      )
      // do something with response
    } catch (error) {
      console.log(error)
    }
  }
  componentWillMount () {
    this.getData()
  }
  render () {
    return (
      <div>
        <h1 className={styles.miclase}>Hello  Dummy</h1>
      </div>
    )
  }
}

export default Dummy
