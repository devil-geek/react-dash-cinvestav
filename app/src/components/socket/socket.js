import uuidv4 from 'uuid/v4'
import openSocket from 'socket.io-client'
const serverUrl = 'http://localhost:5000'
let socket = null
const id = 'UI' + uuidv4()

function socketClient (cb) {
  if (socket == null) {
    socket = openSocket(serverUrl)
    console.log('null')
  }

  socket.on('connect', function () {
    console.log('WS Client - Connected to server, Id:', id)
    socket.emit('logIn', id)
    cb(null, 'Conectado')
  })

  socket.on('connect_error', function (error) {
    console.log('WS Client - Connect Error:', error.type, error.description)
  })

  socket.on('connect_timeout', function (timeout) {
    console.log('WS Client - Connect Timeout:', timeout)
  })

  socket.on('error', function (error) {
    console.log('WS Client - Error', error.type, error.description)
    cb(error.type, 'Error')
  })

  socket.on('reconnect', function (attemptNumber) {
    console.log('WS Client - Reconnected', attemptNumber)
    socket.emit('logIn', id)
    cb(null, 'Conectado')
  })

  socket.on('reconnect_error', function (error) {
    console.log('WS Client - Reconnect Error', error.type, error.description)
  })

  socket.on('reconnect_failed', function () {
    console.log('WS Client - Reconnect Failed')
  })

  socket.on('disconnect', function (reason) {
    console.log('WS Client - Disconnected:', reason)
    cb(null, 'Desconectado')
  })

  socket.on('message', function (data) {
    console.log('WS Client - Message:', data)
    cb(null, data)
  })

  socket.on('devices', function (data) {
    console.log('Devices:', data)
  })

  socket.on('device/alias', function (data) {
    console.log('Device Alias:', data)
  })

  socket.on('device_logs', function (data) {
    console.log('Device Logs:', data)
  })

  socket.on('device_logs/add', function (data) {
    console.log('Device Logs Add:', data)
  })

  socket.on('devices', function (data) {
    console.log('Devices:', data)
  })

  socket.on('command', function (data) {
    console.log('Command:', data)
  })

  socket.on('nodes', function (data) {
    console.log('Nodes:', data)
  })
}

function socketClose () {
  if (socket != null) {
    socket.close()
    socket = null
  }
}

export { socketClient, socketClose }
