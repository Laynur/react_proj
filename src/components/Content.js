import React from 'react'
import CivPage from "../pages/CivPage";

function Content(){
    const btnClck = () =>{

    }
    return (
        <div className="content-block">
            <div onClick={btnClck} className="content-block-blk content-block-blk-civ">
                <h1 className="content-block-blk-text">Цивилизации</h1>
            </div>

            <div className="content-block-blk content-block-blk-unit">
                <h1 className="content-block-blk-text">Юниты</h1>
            </div>
            <div className="content-block-blk content-block-blk-resour">
                <h1 className="content-block-blk-text">Ресурсы</h1>
            </div>
            <div className="content-block-blk content-block-blk-place">
                <h1 className="content-block-blk-text">Местности</h1>
            </div>
            <div className="content-block-blk content-block-blk-building">
                <h1 className="content-block-blk-text">Здания</h1>
            </div>
        </div>
    );
}

export default Content;