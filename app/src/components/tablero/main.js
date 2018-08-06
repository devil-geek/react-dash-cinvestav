import React from 'react'
import SelectMedidor from '../general/selectMedidor'
import SubHeader from '../general/subheader'
import SensorTypes from '../tablero/sensorTypes'
import { socketClient, socketClose } from '../socket/socket'

class Tablero extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      serverData: 'no timestamp yet'
    }
  }

  componentWillMount () {
    socketClient((err, serverData) => {
      if (err) {
        console.log(err)
      }
      this.setState({
        serverData
      })
    })
  }
  componentWillUnmount () {
    socketClose()
  }

  render () {
    return (
      <div id='tablero'>
        <SubHeader titulo='Tablero' />
        <div className='topContainer'>
          <SelectMedidor {...this.props} />
          <SensorTypes {...this.props} />
        </div>
        {this.state.serverData}

        <div className='bottomContainer' />
      </div>
    )
  }
}

export default Tablero
