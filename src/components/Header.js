import React from 'react'

const headerimagePath = './img/civ5_logo.png';
function Header(){
    return (
        <div className="header">
            <div className="header-logo">
                <img className="header-logo headimgs" src={headerimagePath} alt="logo"/>
            </div>
            <input className="input-container" placeholder="Search..."></input>
        </div>
    );
}
export default Header;