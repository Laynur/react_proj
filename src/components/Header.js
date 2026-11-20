import React from 'react'
import {NavLink} from "react-router-dom";
const headerimagePath = `${process.env.PUBLIC_URL}/img/civ5_logo.png`;
function Header({ theme, onToggleTheme }){
    return (
        <div className="header" style={{ '--header-background': `url(${process.env.PUBLIC_URL}/img/civ_header1.jpg)` }}>
            <NavLink to="/" className="header-logo">
                <img className="headimgs" src={headerimagePath} alt="Civilization V — на главную"/>
            </NavLink>
            <button
                className="theme-toggle liquid-glass"
                type="button"
                onClick={onToggleTheme}
                aria-label={`Включить ${theme === 'dark' ? 'светлую' : 'тёмную'} тему`}
                title={`Переключить на ${theme === 'dark' ? 'светлую' : 'тёмную'} тему`}
            >
                <span aria-hidden="true">{theme === 'dark' ? '☀' : '☾'}</span>
                <span>{theme === 'dark' ? 'Светлая тема' : 'Тёмная тема'}</span>
            </button>
        </div>
    );
}
export default Header;
