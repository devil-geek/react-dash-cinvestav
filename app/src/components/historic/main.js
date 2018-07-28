import React from 'react';
import SubHeader from '../general/subheader';

class Historic extends React.Component {
    constructor(props){
        super(props);
        this.toogleList = this.toogleList.bind(this);
        this.changeSelection = this.changeSelection.bind(this);
        this.selectRadio = this.selectRadio.bind(this);
        this.toogleSensor = this.toogleSensor.bind(this);
        this.askPDF = this.askPDF.bind(this);
        this.consultar = this.consultar.bind(this);
        this.state = {
            selectedMedidor: -1,
            activeLists: false,
            types: ["Gráfica", "Tabla"],
            sensors: [
                {
                    name: "VOLTAJE",
                    active: false
                },{
                    name: "CORRIENTE",
                    active: false
                },{
                    name: "P. ACTIVA",
                    active: false
                },{
                    name: "P. REACTIVA",
                    active: false
                },{
                    name: "FDP",
                    active: false
                },{
                    name: "CONSUMO",
                    active: false
                },{
                    name: "SOBRE V.",
                    active: false
                }
                
            ],
            typeSelected: 0
        };
    }
    componentDidMount(){
        this.props.actions.getMedidoresInfo(); //Trae la info de los medidores
    }
    askPDF(){
        /*Función para el boton de pdf*/
        /*Para mandar los sensores activos mandar this.state.sensors*/
        console.log("boton de pdf")
    }
    consultar(){
        /*Función para el boton de pdf*/
        /*Para mandar los sensores activos mandar this.state.sensors*/
        console.log("boton de consultar")
    }
    toogleList(){
        /*Activa y desactiva la lista de los medidores*/
        this.setState({
            activeLists: !this.state.activeLists
        });
    }
    changeSelection(value, name, location){
        /* Cambia el valor del medidor seleccionado, si se desea hacer otra funcion
            cada que cambie de medidor se hará en esta funcion antes de cambiar el estado
        */
        this.setState({
            selectedMedidor: value,
            activeLists: false
        });
    }
    selectRadio(index){
        /* Cambia el radio button si es gráfica o tabla */
        this.setState({
            typeSelected: index 
        });
    }
    toogleSensor(index){
        /* Recibe el id del boton que hay que activar, es el index del arreglo, y se hace un cambio de true o false */
        var parametersArray = this.state.sensors;
        parametersArray[index].active = !parametersArray[index].active;

        this.setState({
            parametersArray
        })
    }
    renderDropMedidor(){
        /* Dibuja las opciones de que medidor */
        var medidorts = this.props.store.medidores;
        return(
            <div className="selectionMedidores">
                <div className={this.state.activeLists === true ? "selectedMedidor activeList" : "selectedMedidor"}>{this.state.selectedMedidor === -1 ? "Selecciona un medidor" : medidorts[this.state.selectedMedidor].labl}</div>
                <div className="listMeasurer" style={{display: this.state.activeLists === true ? 'block' : 'none'}}>
                    {medidorts.map((measurer, index2) => (
                        <div key={index2} className="optionMedidor" onClick={() => this.changeSelection(index2,measurer.name,measurer.ubicacion)}>
                           <span> {measurer.name}</span>
                        </div>
                    ))}
                </div>
                <div className="iconContainer"  onClick={this.toogleList}> 
                    <span className="icon-circle-down"></span>
                </div>
            </div>
        );
    }
    renderRadioButtons(){
        /* Dibuja los radio buttons */
        return(
            <div className="radioButtons">
                {this.state.types.map((opt, index) => (
                    <div className="buttonRadio" key={index}>
                        <div className="circleContainer" onClick={()=>this.selectRadio(index)}>
                            <div className="outsideCircle">
                                <div className={this.state.typeSelected === index ? "circle active" : "circle"}></div>
                            </div>
                        </div>
                        <span className="name">{opt}</span>
                    </div>
                ))}
            </div>
        );
    }
    renderSensorsActive(){
        /* Dibuja los de encendido y apagado de cada opcion */
        return(
            <div className="sensorButton">
                {this.state.sensors.map((item, index) => (
                    <div className="selectionSensor" key={index}>
                        <div className={item.active === true ? "divCircle active" : "divCircle"} onClick={() => this.toogleSensor(index)}>
                            <div className={item.active === true ? "circle active" : "circle"}></div>
                        </div>
                        <span className="name">{item.name}</span>
                    </div>
                ))}
            </div>
        );
    }
    renderOptions(){
        return(
            <div className="optionsDiv">
                <span className="title"> Periodo de eventos </span>
                <div className="medidorSelection">
                    <span className="instruction">Medidor a visualizar</span>
                    {this.renderDropMedidor()}
                </div>
                <div className="selectionOptions">
                    <div className="periodSelection">
                        <span className="instruction">Fecha inicial</span>
                        <input type="date"></input>
                        <span className="instruction">Fecha final</span>
                        <input type="date"></input>
                    </div>
                    {this.renderRadioButtons()}
                </div>
                <div className="sensorsSelection">
                    <div className="sensorDiv">
                        <span className="instruction">Sensores: </span>
                        {this.renderSensorsActive()}
                    </div>
                    
                    <div className="buttonsContainer">
                        <div className="button pdf" onClick={this.askPDF}>PDF</div>
                        <div className="button cons" onClick={this.consultar}>Consultar</div>
                    </div>
                </div>
            </div>
        )
    }
    renderResults(){
        return(
            <div>
                Sección Resultados
            </div>
        )
    }
    render() {
        return (
            <div id="historic">
                <SubHeader titulo="Histórico de eventos"/>
                {this.props.store.medidores != null ? this.renderOptions() : null}
                {this.renderResults()}
            </div>
        );
    }
}

export default Historic;