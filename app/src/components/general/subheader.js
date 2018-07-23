import React from 'react';

class SubHeader extends React.Component {
    render() {
        return (
            <div className="subheader">
                <div className="line"></div> 
                <span className="titleDiv">{this.props.titulo} </span>
                <div className="line"></div> 
            </div>
        );
    }
}

export default SubHeader;