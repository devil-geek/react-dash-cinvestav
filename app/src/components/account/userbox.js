import React from 'react';
import EditUser from '../general/editUser';


class UserBox extends React.Component {
    constructor(props){
        super(props);
        this.activatePopUp =this.activatePopUp.bind(this);
        this.deactivatePopUp =this.deactivatePopUp.bind(this);
    }
    activatePopUp(name, email){
        this.props.actions.editMyAccountData(true,name,email);
    }
    deactivatePopUp(){
        this.props.actions.editMyAccountData(false,"","");
    }
    render() {
        return (
            <div className="userbox">   
                    <div className="header">
                        <div className="iconbox">
                            <div className="icono">
                                <span className="ico icon-user2"/>
                            </div>
                        </div>    
                        <div className="user">
                            <span className="usertype">{this.props.store.myAccount.type}</span>
                            <span className="name">{this.props.store.myAccount.name}</span>
                        </div>
                    </div>
                    <div className="infouser">
                        <span className="email">{this.props.store.myAccount.email}</span>
                        <span className="ico icon-edit-user" onClick={()=>this.activatePopUp(this.props.store.myAccount.name, this.props.store.myAccount.email)}/>
                    </div>
                    <EditUser {...this.props} data={this.props.store.editAccount} from="account" deactivatePopUp={()=>this.deactivatePopUp}/>          
            </div>
        );
    }
}

export default UserBox;