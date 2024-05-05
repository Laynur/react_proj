import React from 'react'
import {NavLink} from "react-router-dom";
import {Text} from '@consta/uikit/TextDeprecated';
function Content(){
    return (
        <div className="content-block">
            {/*<div className="content-block-blk content-block-blk-civ">*/}
            {/*    <h1 className="content-block-blk-text">Цивилизации</h1>*/}
            {/*</div>*/}
            <NavLink to="/civpage" className="content-block-blk content-block-blk-civ">
                {/*<h1 className="content-block-blk-text">Цивилизации</h1>*/}
                <Text size="3xl" view="normal" weight="black" cursor="pointer" className="content-block-blk-text">Цивилизации</Text>
            </NavLink>
            <NavLink to="/unitpage" className="content-block-blk content-block-blk-unit">
                {/*<h1 className="content-block-blk-text">Юниты</h1>*/}
                <Text size="3xl" view="normal" weight="black" cursor="pointer" className="content-block-blk-text">Юниты</Text>
            </NavLink>
            <NavLink to="/resourcepage" className="content-block-blk content-block-blk-resour">
                {/*<h1 className="content-block-blk-text">Ресурсы</h1>*/}
                <Text size="3xl" view="normal" weight="black" cursor="pointer" className="content-block-blk-text">Ресурсы</Text>
            </NavLink>
            <NavLink to="/techpage" className="content-block-blk content-block-blk-tech">
                {/*<h1 className="content-block-blk-text">Технологии</h1>*/}
                <Text size="3xl" view="normal" weight="black" cursor="pointer" className="content-block-blk-text">Технологии</Text>
            </NavLink>
            <NavLink to="/buildingpage" className="content-block-blk content-block-blk-building">
                {/*<h1 className="content-block-blk-text">Здания</h1>*/}
                <Text size="3xl" view="normal" weight="black" cursor="pointer" className="content-block-blk-text">Здания</Text>
            </NavLink>

        </div>
    );
}

export default Content;