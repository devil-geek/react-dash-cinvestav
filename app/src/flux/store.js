import actionTypes from './actionTypes'
import dispatcher from './dispatcher'
import { EventEmitter } from 'events'
import assign from 'object-assign'
// import _ from 'underscore';
import login from '../data/login.json'
import menu from '../data/menuTypes.json'
import medidores from '../data/medidores.json'
import sensorTypes from '../data/sensorTypes.json'
import notification from '../data/notificationUsers.json'
import ranges from '../data/parametersRange.json'
const CHANGE_EVENT = 'change'

let AppData = {
  data: {
    login: true,
    userInfo: null,
    menuOptions: null,
    sensorTypes: null,
    notification: null,
    editUser: {
      id: '',
      active: false,
      name: '',
      email: ''
    },
    myAccount: null,
    editAccount: {
      active: false,
      name: '',
      email: ''
    },
    parameters: null,
    medidores: null
  },
  getUserInfo () {
    AppData.data.userInfo = login.infoLogin
    AppData.data.menuOptions = menu.menuTypes[AppData.data.userInfo.type]
    AppStore.emitChange()
  },
  getMedidoresInfo () {
    AppData.data.medidores = medidores.medidores
    AppStore.emitChange()
  },
  getSensorTypes () {
    AppData.data.sensorTypes = sensorTypes.sensorTypes
    AppStore.emitChange()
  },
  getNotifications () {
    AppData.data.notification = notification.NotificationUser // comes from json
    AppStore.emitChange()
  },
  changeValueNotificacion (action) {
    AppData.data.notification.map((item, index) => {
      if (action.name === item.name) {
        AppData.data.notification[index].perday = !action.value
        AppStore.emitChange()
      }
    })
  },
  editNotificationData (action) {
    AppData.data.editUser.id = action.id
    AppData.data.editUser.active = action.value
    AppData.data.editUser.name = action.name
    AppData.data.editUser.email = action.email
    AppStore.emitChange()
  },
  saveChangesEditUser (action) {
    AppData.data.notification.map((item, index) => {
      if (action.id === item.id) {
        AppData.data.notification[index].name = action.name
        AppData.data.notification[index].email = action.email
        AppData.data.editUser.active = false
        AppStore.emitChange()
      }
    })
  },
  getParametersRange () {
    // obtiene los valores del back, en este caso tu base de datos con los datos generales
    // le agregue un valor al json, para que ahora se regrese de esa forma
    AppData.data.parameters = ranges.parameterRange
    AppStore.emitChange()
  },
  setParametersRange (action) {
    // Esta funcion se manda a llamar con el Guardar cambios del componente de rango de parametros
    // en el action.parameters encontraras el nuevo objeto con los nuevos valores
    console.log(action)
  },
  /***********************************************************************************/
  getMyAccount () {
    AppData.data.myAccount = login.infoLogin // comes from json
    AppStore.emitChange()
  },
  editMyAccountData (action) {
    AppData.data.editAccount.active = action.value
    AppData.data.editAccount.name = action.name
    AppData.data.editAccount.email = action.email
    AppStore.emitChange()
  },
  saveChangesEditMyAccount (action) {
    AppData.data.editAccount.active = false
    AppData.data.myAccount.name = action.name
    AppData.data.myAccount.email = action.email
    AppStore.emitChange()
  }
}
/** ************************************************* */

let AppStore = assign({}, EventEmitter.prototype, {
  emitChange: function () {
    this.emit(CHANGE_EVENT)
  },
  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback)
  },
  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback)
  }
})
/** ************************************************* */

AppStore = assign({}, AppStore, {
  getData: () => {
    return AppData.data
  },
  getParametersRange: () => {
    return AppData.data.parameters
  }
})

dispatcher.register((action) => {
  switch (action.type) {
    case actionTypes.GET_USERINFO:
      AppData.getUserInfo()
      break
    case actionTypes.GET_MEDIDORESINFO:
      AppData.getMedidoresInfo()
      break
    case actionTypes.GET_MENUTYPES:
      AppData.getMenuTypes()
      break
    case actionTypes.GET_SENSORTYPES:
      AppData.getSensorTypes()
      break
    case actionTypes.GET_NOTIFICATIONS:
      AppData.getNotifications()
      break
    case actionTypes.CHANGE_VALUENOTIFICATION:
      AppData.changeValueNotificacion(action)
      break
    case actionTypes.EDIT_NOTIFICATIONDATA:
      AppData.editNotificationData(action)
      break
    case actionTypes.SAVE_CHANGESEDITUSER:
      AppData.saveChangesEditUser(action)
      break
    case actionTypes.GET_MYACCOUNT:
      AppData.getMyAccount(action)
      break
    case actionTypes.EDIT_MYACCOUNTDATA:
      AppData.editMyAccountData(action)
      break
    case actionTypes.SAVE_CHANGESEDITMYACCOUNT:
      AppData.saveChangesEditMyAccount(action)
      break
    case actionTypes.GET_PARAMETERSRANGE:
      AppData.getParametersRange(action)
      break
    case actionTypes.SET_PARAMETERSRANGE:
      AppData.setParametersRange(action)
      break
    default:

		// no op
  }
})

module.exports = AppStore
