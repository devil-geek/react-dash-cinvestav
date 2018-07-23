import React from 'react';
class SensorTypes extends React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount() {
      this.props.actions.getSensorTypes();
    }
    renderSensors() {
            //map 
            var sensorTypesJs = this.props.store.sensorTypes.Administrador;
            if (sensorTypesJs == undefined)
            return null;

            return sensorTypesJs.map((opt, index) => (
                <div className='sensorBox' key={index}>
                    <div className="divIcon" style={{background: opt.color}}>
                        <span className={opt.ico==="" ? "ico italic" : opt.ico === "icon-energy2" ? "ico energy "+opt.ico : "ico "+opt.ico}>{opt.ico === "" ? "fdp" : ""}</span>
                    </div>
                        <div className="divMeassureType">
                            <div className="contMeassure">
                                <span className="numMeassure">{opt.meassure+" "+opt.unit}</span>
                            </div>
                            <span className="meassureType">{opt.type}</span>
                        </div>
                </div>
        ));
    }

    render() {
        return (
             <div className="buttonContainer">
                <div className="medidas">
                    <span>Mediciones</span>
                </div>
                {this.props.store.sensorTypes != null ? this.renderSensors() : null}
              </div>
        );
    }
}

export default SensorTypes;