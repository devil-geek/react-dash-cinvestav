import React from 'react';
import SubHeader from '../general/subheader';

class Settings extends React.Component {
    renderInfoContainer(){
        return(
            <div className="divConsumo">
                <div className="infoDiv">
                    <span className="ico icon-consumtion2"></span>
                    <span>2500kW</span>                            
                </div>
                <div className="subTitle">
                    <span>Consumo</span>
                </div>
            </div>
        );
    }
    renderRelation(){
        return(
            <div className="relationDiv">
                <div className="title">Ajuste de la Relación de Transformación</div>
                <div className="leftContainer">
                    <span className="smallTitle">Relación de Tranformación Actual</span>
                    {this.renderInfoContainer()}                    
                </div>
                <div className="rightContainer">
                    <span  className="smallTitle">Nueva Relación de Transformación</span>
                    <div className="inputDiv"><input className="inputTransf" defaultValue="nnn:mmmmm"></input></div>
                    <div className="buttonChange">Guardar cambios</div>
                </div>
            </div>
        );
    }
    renderReset(){
        return(
            <div className="resetDiv">
                <div className="title">Resetear valor de consumo</div>
                <div className="left">
                    <span className="smallTitle">Consumo actual</span>
                    {this.renderInfoContainer()}
                </div>
                <div className="right">
                    <span>Reset a 0</span>
                    <div className="buttonReset">Reset</div>
                </div>
            </div>
        );
    }
    render() {
        return (
            <div className="settings">
                <SubHeader titulo="Ajustes"/>
                <div className="contentSettings">
                    {this.renderRelation()}
                    {this.renderReset()}
                </div>
            </div>
        );
    }
}

export default Settings;