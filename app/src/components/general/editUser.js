var React = require('react');

class EditUser extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            email: ''
        };
        this.saveChanges = this.saveChanges.bind(this);
        this.saveChangesMyAccount = this.saveChangesMyAccount.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onKey = this.onKey.bind(this);
    }
    handleChange(event) {
        if(event.target.className=="name")
            this.setState({name: event.target.value});
        else   
            this.setState({email: event.target.value});
    }
    onKey(event){
        if (event.keyCode === 32) {
            console.log('You pressed the escape key!')
        }
    }
    saveChanges(){
        if(this.state.name != "" && this.state.email != ""){
            this.props.actions.saveChangesEditUser(this.props.store.editUser.id, this.state.name, this.state.email);
            this.setState({email: '', name: ''});
        }
        else{
            if(this.state.name=="") this.props.actions.saveChangesEditUser(this.props.store.editUser.id, this.props.store.editUser.name, this.state.email);
            if(this.state.email=="") this.props.actions.saveChangesEditUser(this.props.store.editUser.id, this.state.name, this.props.store.editUser.email);
            this.setState({email: '', name: ''});
        }
    }
    saveChangesMyAccount(){
        if(this.state.name != "" && this.state.email != ""){
            this.props.actions.saveChangesEditMyAccount(this.state.name, this.state.email);
            this.setState({email: '', name: ''});
        }
        else{
            if(this.state.name=="") this.props.actions.saveChangesEditMyAccount(this.props.store.editAccount.name, this.state.email);
            if(this.state.email=="") this.props.actions.saveChangesEditMyAccount(this.state.name, this.props.store.editAccount.email);
            this.setState({email: '', name: ''});
        }
    }
    renderPopUp(){
        return (
            <div className='editUserContainer'>
                <div className="headerEditUser">
                    <div className="tittleContainer">                
                        <span className="title">
                            {this.props.from == "notifications" ? "Editar Datos para Usuario de Notificación" : "Editar Datos de Usuario"}
                        </span>
                    </div>
                    <div className="icoContainer">
                        <span className="ico icon-cross" onClick={this.props.deactivatePopUp()}></span>
                    </div>
                </div>
                <div className="divInputs">
                    <span className="titleInput">Nombre: </span>
                    <input type="text" className="name" defaultValue={this.props.data.name} valors="hola" onChange={this.handleChange}></input>
                </div>
                <div className="divInputs">
                    <span className="titleInput">Email: </span>
                    <input className="email" defaultValue={this.props.data.email} onKeyUp={this.onKey} onChange={this.handleChange}></input>
                </div>
                <div className="buttonC">
                    <div className="buttonSave" onClick={this.props.from=="notifications" ? ()=>this.saveChanges() : ()=>this.saveChangesMyAccount()}>
                        <span className="textButton">Guardar</span>
                    </div>
                </div>
            </div>
        );
    }
    render() {
        return(
            this.props.data.active == true ? <div className="frontContainer"> {this.renderPopUp()} </div> : null
        );
    }
  }
  export default EditUser;

