import React from 'react';
import SubHeader from '../general/subheader';
import EditUser from '../general/editUser';

class Notifications extends React.Component {
    constructor(props){
        super(props);
        this.changeValue = this.changeValue.bind(this);
        this.activatePopUp =this.activatePopUp.bind(this);
        this.deactivatePopUp =this.deactivatePopUp.bind(this);
    }
    componentDidMount() {
        this.props.actions.getNotifications();
      }
    changeValue(value, name){
        this.props.actions.changeValueNotificacion(name, value);
    }
    activatePopUp(id, name, email){
        this.props.actions.editNotificationData(true,id,name,email);
    }
    deactivatePopUp(){
        this.setState({email: '', name: ''});
        this.props.actions.editNotificationData(false,"","","");
    }
    renderNotifications(){
            var notificationsJs = this.props.store.notification;
            return (
                    <table> 
                        <tbody>
                            <tr>
                                <th>Nombre</th>
                                <th>Correo</th>
                                <th>Notificaciones</th>
                                <th></th>
                            </tr>
                        {
                            notificationsJs.map((item, index) => (
                                <tr>
                                    <td className="nombreWrap">
                                        <div className="iconContact">
                                            <span className="ico icon-contact"></span>
                                        </div>
                                        <span className="nameWrap">{item.name}</span>
                                    </td>
                                    <td className="emailWrap">{item.email}</td>
                                    <td className="notificationWrap">
                                        <div className="checkbox">
                                            <span onClick={() => this.changeValue(item.perday, item.name)} className={item.perday==false ? "ico icon-checkbox-checked" : "ico icon-checkbox-unchecked"}></span>                                            
                                            <span className="text">Por Alarma</span>
                                        </div>
                                        <div className="checkbox">
                                            <span onClick={() => this.changeValue(item.perday, item.name)} className={item.perday==true ? "ico icon-checkbox-checked" : "ico icon-checkbox-unchecked"}></span>
                                            <span className="text">Por Día</span>
                                        </div>
                                    </td>
                                    <td className="iconWrap">
                                        <span  onClick={() => this.activatePopUp(item.id, item.name, item.email)} className="icoEdit icon-edit"></span>
                                        <span className="icoDelete icon-delete"></span>
                                    </td>
                                </tr>
                        ))}
                        </tbody>
                    </table>
            );
    }
    render() {
        return (
            <div className="notifications">
                <SubHeader titulo="Notificaciones"/>
                <div className="contentTable">
                    <div id="titlePrincipal">Lista de notificaciones a usuarios</div>
                    {this.props.store.notification != null ? this.renderNotifications() : null}
                </div>
                
                <div className="buttonCont">
                    <div className="button1"> 
                        <span className="ico icon-add-user-button"></span>
                        <span>Añadir</span>
                    </div>
                    <div className="button2"> 
                        <span>Guardar</span>
                    </div>
                </div>
                <EditUser {...this.props} data={this.props.store.editUser} from="notifications" deactivatePopUp={() => this.deactivatePopUp}/>
            </div>
        );
    }
}

export default Notifications;