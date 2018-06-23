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
      <section className='section'>
        <div className='container'>
          <h1 className='title'>Section</h1>
          <h2 className='subtitle'>
            A simple container to divide your page into <strong>sections</strong>, like the one you're currently reading
          </h2>
        </div>
      </section>
    )
  }
}

export default Dummy
