import React from 'react';
import SubHeader from '../general/subheader';
import UserBox from '../account/userbox.js';


class Account extends React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount() {
        this.props.actions.getMyAccount();
    }
    render() {
        return (
            <div className="account">
            <SubHeader titulo="Mi Cuenta"/>  
                <div className="contentAccount"> 
                    <div className="contentUserBox">
                        {this.props.store.myAccount != null ? <UserBox {...this.props}/> : null}
                    </div>
                    <div className="contentButtons">   
                        <div className="buttonSalir">
                            <span className="ico icon-logout"/>
                            <span>Salir</span>
                        </div>
                        <div className="buttonAdd">
                            <span className="ico icon-add-user-button"/>
                            <span>Agregar Usuario</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Account;