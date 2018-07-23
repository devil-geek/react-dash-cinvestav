import React from 'react';

class Login extends React.Component {
    renderLogin(){
        return(
            <div className="loginContainer">
                <div className="leftContainer">
                    <div className="content">
                        <span className="importantTitle">Inicio de sesión</span>
                        <span className="littleTitle">Ingresa a tu cuenta</span>
                        <div className="inputContainer">
                            <input></input>
                            <input></input>
                        </div>
                        <div className="button">
                            Entrar
                        </div>
                        <span className="forgotLabel">¿Olvidaste tu contraseña?</span>
                    </div>
                </div>
                <div className="rightContainer">
                    <div className="content">
                        <span className="ico icon-cinvestav"></span>
                        <span className="lblCinves">Cinvestav</span>
                        <span className="lblName">Sistema de monitoreo eléctrico</span>
                    </div>

                </div>
            </div>
        )
    }
    render() {
        return (
            <div id="login">
                {this.renderLogin()}
            </div>
        );
    }
}

export default Login;