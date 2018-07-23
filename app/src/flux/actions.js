import actionTypes from './actionTypes';
import dispatcher from './dispatcher';

const Actions = {
    getUserInfo() {
        dispatcher.dispatch({
            type: actionTypes.GET_USERINFO
        });
    },
    getMedidoresInfo() {
        dispatcher.dispatch({
            type: actionTypes.GET_MEDIDORESINFO
        });
    },
    getMenuTypes() {
        dispatcher.dispatch({
            type: actionTypes.GET_MENUTYPES
        });
    },
    getSensorTypes() {
        dispatcher.dispatch({
            type: actionTypes.GET_SENSORTYPES
        });
    },
    getNotifications() {
        dispatcher.dispatch({
            type: actionTypes.GET_NOTIFICATIONS
        });
    },  
    changeValueNotificacion(name, value) {
        dispatcher.dispatch({
            type: actionTypes.CHANGE_VALUENOTIFICATION,
            name,
            value
        });
    }, 
    editNotificationData(value, id, name, email) {
        dispatcher.dispatch({
            type: actionTypes.EDIT_NOTIFICATIONDATA,
            value,
            id,
            name,
            email
        });
    },  
    saveChangesEditUser(id, name, email) {
        dispatcher.dispatch({
            type: actionTypes.SAVE_CHANGESEDITUSER,
            id,
            name,
            email
        });
    },
    getMyAccount(){
        dispatcher.dispatch({
            type: actionTypes.GET_MYACCOUNT
        });
    },
    editMyAccountData(value, name, email) {
        dispatcher.dispatch({
            type: actionTypes.EDIT_MYACCOUNTDATA,
            value,
            name,
            email
        });
    },
    saveChangesEditMyAccount(name, email){
        dispatcher.dispatch({
            type: actionTypes.SAVE_CHANGESEDITMYACCOUNT,
            name,
            email
        });    
    },  
    getParametersRange() {
        dispatcher.dispatch({
            type: actionTypes.GET_PARAMETERSRANGE
        });
    }, 
    setParametersRange(parameters) {
        dispatcher.dispatch({
            type: actionTypes.SET_PARAMETERSRANGE,
            parameters
        });
    }  
};
export default Actions;
