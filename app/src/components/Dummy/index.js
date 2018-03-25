import React, { Component } from 'react'
import styles from './Dummy.scss'
import axios from 'axios'

class Dummy extends Component {
  async getData () {
    try {
      let res = await axios('http://localhost:3000/api/')
      let data = res.data
      console.log(data)

      res = await axios('http://localhost:3000/admin/my')
      data = res.data
      console.log(data)

      res = await axios('http://localhost:3000/admin/')
      data = res.data
      console.log(data)
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
        <h1 className={styles.miclase}>Hello Dummy</h1>
      </div>
    )
  }
}

export default Dummy
