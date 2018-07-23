import React from 'react';

class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <div className= "back-ico">
                    <span className="ico icon-cinvestav"></span>
                </div>
                <div className="cinves">
                    <span className="spanCinves">Cinvestav</span>
                </div>
             </div>
        );
    }
}

export default Header;