import React from 'react';
import SubHeader from '../general/subheader';
import SelectMedidor from '../general/selectMedidor';
import Slider, { createSliderWithTooltip } from 'rc-slider';
import AppStore from '../../flux/store';
import 'rc-slider/assets/index.css';

function getParameters() {
    return AppStore.getParametersRange();
}
function percentFormatter(v) {
    return `${v*10}`;
}
const Range = createSliderWithTooltip(Slider.Range)

class ParameterRange extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id: "",
            parameters: getParameters(), //trae los valores del store en los parametros para poderlos usar como variable local
            marks: { //Este es quien le da el estilo a las marcas del rango de parametros
                0: <strong>0</strong>,
                50: '500',
                100: {
                  style: {
                    color: 'black',
                  },
                  label: <strong>1000</strong>,
                }
            }
        };
        this._onChange = this._onChange.bind(this);
        this.onSliderChange = this.onSliderChange.bind(this);   
        this.setID = this.setID.bind(this);   
        this.sendChanges = this.sendChanges.bind(this);   
    }
    componentDidMount() {
        this.props.actions.getParametersRange(); //manda a llamar la funcion para traer los parametros
        //del store y lo hace la primera vez que se llama este componente
        AppStore.addChangeListener(this._onChange);
    }
    componentWillUnmount() {
        AppStore.removeChangeListener(this._onChange);
    }
    _onChange() {
        this.setState({parameters: getParameters()});
    }
    setID(index){
        //Este nos sirve para cada que se le da clic al divisor de cada uno de los elementos
        //pueda setear el valor general id por el index del que fue señalado
        this.setState({id: index});
    }
    changeNotification(index){
        //Este funciona igual que el rango para los parametros solo que este lo hace para las notificaciones
        //cuando lo encuentra cambia el valor de la notificaciones del index 
        var parametersArray = this.state.parameters;
        for (var i = 0; i < parametersArray.length; i++) {
            if(this.state.id == i){
                parametersArray[i].notification = !parametersArray[i].notification;
            }
        }
        this.setState({parameters : parametersArray});
    }
    onSliderChange(value){
        //este agarra el index del parametro que se cambio y con el for busca el index del que 
        //se va a cambiar, el index del voltaje es 1 entonces si se cambian valores del voltaje
        //el for lo busca y los cambias
        var parametersArray = this.state.parameters;
        for (var i = 0; i < parametersArray.length; i++) {
            if(this.state.id == i){
                parametersArray[i].values = value;
            }
        }
        this.setState({parameters : parametersArray});
    }
    sendChanges(){
        //manda las variables cambiadas al store
        //this.state.parameters contiene todos los nuevos valores que se cambiaron
        this.props.actions.setParametersRange(this.state.parameters);
    }
    renderTableofParameters(){
        //Dibuja la tabla con las diferentes columnas el typeWrap es el que contiene el nombre de la fila
        //el rangeWrap contiene el rango de parametros
        //el notificatioinButtons tiene el encendido y el apagado
        var parameters = this.state.parameters;
            return (
                <div className="contentTable2">
                    <div id="titlePrincipal">Ajustes el rango de los sensores</div>
                    <table className="rangeTable">
                        <tbody>
                        <tr className="tableTitles">
                            <th>Sensor</th>
                            <th>Rango</th>
                            <th>Notificación</th>
                        </tr>
                        {
                            parameters.map((item, index) => (
                                <tr key={index} onClick={()=>this.setID(index)}>
                                    <td className="typeWrap">
                                        <span className="textWrap" style={{background: item.color, border: item.color}}>{item.text}</span>
                                    </td>
                                    <td className="rangeWrap">
                                        <Range dots allowCross={false} tipFormatter={percentFormatter} marks={this.state.marks} value={item.values} onChange={this.onSliderChange} />
                                    </td>
                                    <td className="notificationButtons">
                                        <div className={item.notification === true ? "divCircle active" : "divCircle"} onClick={() => this.changeNotification(index)}>
                                            <div className={item.notification === true ? "circle active" : "circle"}></div>
                                        </div>
                                    </td>
                                </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            );

    }
    render() {
        return (
            <div className="rangeContainer">            
                <SubHeader titulo="Rango de parámetros"/>
                <SelectMedidor {...this.props} />
                {this.state.parameters != null ? this.renderTableofParameters() : null}
                <div className="buttonChangeR" onClick={this.sendChanges}>
                    Guardar Cambios
                </div>
            </div>
        );
    }
}

export default ParameterRange;