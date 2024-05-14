import React from 'react'
import {NavLink} from "react-router-dom";
//const headerimagePath = './img/civ5_logo.png';
const headerimagePath = '//assets.2k.com/1a6ngf98576c/2uvObr46XF482VHfoyT40L/fe61d6416cd327c8571207291a908ea2/Civilization_Brand_Logo_NavBar_gold.svg';
function Header(){
    return (
        <div className="header">
            <NavLink to="/" className="header-logo">
                <img className="header-logo headimgs" src={headerimagePath} alt="logo"/>
            </NavLink>

        </div>
    );
}
export default Header;