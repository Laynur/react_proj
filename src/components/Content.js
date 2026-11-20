import React from 'react'
import {NavLink} from "react-router-dom";
import {Text} from '@consta/uikit/Text';
function Content(){
    return (
        <div className="content-block" style={{ '--home-background': `url(${process.env.PUBLIC_URL}/img/civ_content.jpg)` }}>
            <div className="content-intro">
                <p className="content-eyebrow">Civilization V · справочник</p>
                <h1 className="content-title">История начинается с тебя</h1>
                <p className="content-description">
                    Изучай державы, технологии и юниты, чтобы спланировать путь к победе.
                </p>
            </div>
            <NavLink to="/civpage" className="content-block-blk content-block-blk-civ">
                <Text view="normal" weight="black" cursor="pointer" className="content-block-blk-text">Цивилизации</Text>
            </NavLink>
            <NavLink to="/unitpage" className="content-block-blk content-block-blk-unit">
                <Text view="normal" weight="black" cursor="pointer" className="content-block-blk-text">Юниты</Text>
            </NavLink>
            <NavLink to="/resourcepage" className="content-block-blk content-block-blk-resour">
                <Text view="normal" weight="black" cursor="pointer" className="content-block-blk-text">Ресурсы</Text>
            </NavLink>
            <NavLink to="/techpage" className="content-block-blk content-block-blk-tech">
                <Text view="normal" weight="black" cursor="pointer" className="content-block-blk-text">Технологии</Text>
            </NavLink>
            <NavLink to="/buildingpage" className="content-block-blk content-block-blk-building">
                <Text view="normal" weight="black" cursor="pointer" className="content-block-blk-text">Здания</Text>
            </NavLink>

        </div>
    );
}

export default Content;
