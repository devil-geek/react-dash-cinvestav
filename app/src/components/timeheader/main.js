import React from 'react';

class TimeHeader extends React.Component {
    getTime(){
        var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
        var f=new Date();
       return f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear();
    }
    render() {
        return (
            <div className="timeheader">
                <div className= "time">
                    <span className="icon-clock-white"></span>
                    <span className="txtTime">{this.getTime()}</span>
                </div>
            </div>
        );
    }
}

export default TimeHeader;