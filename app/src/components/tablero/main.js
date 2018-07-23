import React from 'react';
import SelectMedidor from '../general/selectMedidor';
import SubHeader from '../general/subheader';
import SensorTypes from '../tablero/sensorTypes';

class Tablero extends React.Component {
    render() {
        return (
            <div id="tablero">    
            <SubHeader titulo="Tablero"/>
                <div className="topContainer">
                    <SelectMedidor {...this.props} />
                    <SensorTypes {...this.props}/>
                </div>
                <div className="bottomContainer">
                
                </div>
            </div>
        );
    }
}

export default Tablero;