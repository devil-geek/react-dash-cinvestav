import React from 'react';

class selectMedidor extends React.Component {
    constructor(props){
        super(props);
        this.toogleList = this.toogleList.bind(this);
        this.changeSelection = this.changeSelection.bind(this);
        this.state = {
            selectedMedidor: -1,
            name: "",
            location: "",
            activeLists: false
        };
    }
    componentDidMount(){
        this.props.actions.getMedidoresInfo();
    }
    toogleList(){
        this.setState({
            activeLists: !this.state.activeLists
        });
    }
    changeSelection(value, name, location){
        this.setState({
            selectedMedidor: value,
            name: name,
            location: location,
            activeLists: false
        });

        //mandar a llamar la información de ese medidor
    }
    renderDropMedidor(){
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
    render() {
        return (
            <div className="contSelectMedidor">
                <span className="titleInfo">Información del medidor</span>
                
                <div className="infoContainerMedidor">
                    <div className="leftInfo">
                        {
                            this.props.store.medidores !== null ? this.renderDropMedidor() : null
                        }
                    </div>
                    <div className="rightInfo">
                        <div className="infoBlock">
                            <span className="titleSpan">Ubicación:</span>
                            <span className="infoSpan">{this.state.location}</span>
                        </div>
                        <div className="infoBlock">
                            <span className="titleSpan">Nombre:</span>
                            <span className="infoSpan">{this.state.name}</span>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default selectMedidor;