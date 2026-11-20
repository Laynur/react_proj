import React from 'react'
import {NavLink} from "react-router-dom";
const headerimagePath = `${process.env.PUBLIC_URL}/img/civ5_logo.png`;
function Header(){
    return (
        <div className="header" style={{ '--header-background': `url(${process.env.PUBLIC_URL}/img/civ_header1.jpg)` }}>
            <NavLink to="/" className="header-logo">
                <img className="header-logo headimgs" src={headerimagePath} alt="logo"/>
            </NavLink>
            {/*<input className="input-container" placeholder="Search..."></input>*/}
        </div>
    );
}
export default Header;
