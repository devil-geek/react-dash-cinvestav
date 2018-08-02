import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import AppStore from '../flux/store';
import Tablero from '../components/tablero/main';
import Settings from '../components/settings/main';
import Notifications from '../components/notifications/main';
import Account from '../components/account/main';
import Historic from '../components/historic/main';
import Login from '../components/login/main';
import ParameterRange from '../components/range/main';
import Header from '../components/header/main';
import TimeHeader from '../components/timeheader/main';
import Footer from '../components/footer/main';
import actions from '../flux/actions';
import SubHeader from '../components/general/subheader';



function getAppState() {
    return AppStore.getData();
}
class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            store: getAppState(),
            active: false
        }
        this._onChange = this._onChange.bind(this);
        this.openMenu = this.openMenu.bind(this);
    }
    componentDidMount() {
        actions.getUserInfo();  
        AppStore.addChangeListener(this._onChange);
    }
    componentWillUnmount() {
        AppStore.removeChangeListener(this._onChange);
    }
    _onChange() {
       this.setState({store: getAppState()});
    }
    openMenu(){
        this.setState({
            active: !this.state.active
        })
    }
    renderMenu(){
        return this.state.store.menuOptions.map((opt, index) => (
            <Link className="linkStyle" key={index} to={opt.path}>
            {
                this.state.active === false ?
                    <div className={this.state.active === true ? 'menuOption active' : 'menuOption'} key={index}>
                        <span className={"ico "+opt.ico}></span>
                    </div>
                :
                    <div className={this.state.active === true ? 'menuOption active' : 'menuOption'} key={index}>
                        <span className={"ico "+opt.ico}></span>
                        <span className="txtMenu"> {opt.text}</span>
                    </div>
            }
              
            </Link>
        ));
    }
    render() {
        return (
            <div>
                {
                    this.state.store.login === false ? 
                        <Login {...this.state} actions={actions}/>
                    :
                    <Router>
                        <div id="generalDiv">
                            <Header />
                            <div className={this.state.active ? "barMenu active" : "barMenu"}>
                                {
                                    this.state.active === true ? 
                                    <div>
                                        <TimeHeader /> 
                                        <span className="ico icon-menu" onClick={this.openMenu}></span>
                                    </div>
                                : 
                                    <div className="menuIcon" onClick={this.openMenu}>
                                        <span className="icon-menu"></span>
                                    </div>
                                }
                                {this.state.store.menuOptions != null ? this.renderMenu() : null}
                            </div>
                            <div className={this.state.active === true ? "views active" : "views"}>
                                <Switch>
                                    <Route path='/login' render={(props) => <Login {...this.state} actions={actions}/>} />
                                    <Route path='/tablero' render={(props) => <Tablero {...this.state} actions={actions}/>} />
                                    <Route path='/historial' render={(props) => <Historic {...this.state} actions={actions}/>} />
                                    <Route path='/rango' render={(props) => <ParameterRange {...this.state} actions={actions}/>} />
                                    <Route path='/ajustes' component={Settings} />
                                    <Route path='/notificaciones' render={(props) => <Notifications {...this.state} actions={actions}/>} />
                                    <Route path='/miCuenta' render={(props) => <Account {...this.state} actions={actions}/>} />
                                    <Route render={function (){
                                        return <p> Not Found </p>
                                    }} />
                                </Switch>
                            </div>
                            <Footer />
                        </div>
                    </Router>
                }
            </div>
        );
    }
}

export default App;