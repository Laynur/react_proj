import React, { useState, useEffect } from 'react';

function BuildingParser() {
    const [buildings, setBuilding] = useState([]);
    const [displayEl, setDisplayEl] = useState('none');
    const [widthSize, setWidthSize] = useState('1920px');
    const [selectedBuilding, setSelectedBuilding] = useState(null);
    useEffect(() => {
        fetch('https://eyefyre.github.io/civvapi/v1/ru/buildings/buildings.json')
            .then(response => response.json())
            .then(data => setBuilding(data));
    }, []);
    const rightPanel = (building) =>{
        setWidthSize('960px')
        setDisplayEl('block')
        setSelectedBuilding(building)
    }
    const closeRightPanel = () => {
        setDisplayEl('none')
        setWidthSize('1920px')
    }
    return (
        <div className="parser-content-page">
            <div style={{width:widthSize}}>
                <h1 style={{color:'white'}}>Список ресурсов</h1>
                <div className="parser-content">

                    {buildings.map(building => (
                        <div className="parser-content-block" key={building.id} onClick={()=>rightPanel(building)}>
                            <img src={building.icon} alt={building.name}/>
                            <p style={{color: 'white'}}>{building.name.split('|')[0]}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div style={{display: displayEl}} className="parser-content-info">
                <div className="parser-content-info-header">
                    {selectedBuilding && (
                        <div className="parser-content-info-header-gameinfo">
                            <div>
                                <h2 style={{color: 'white'}}>{selectedBuilding.name.split('|')[0]}</h2>
                                <img src={selectedBuilding.icon}/>
                            </div>
                            <div>
                                <h2 style={{color: 'white'}}>{selectedBuilding.game_info}</h2>
                            </div>
                        </div>

                    )}
                    <div>
                        <button onClick={closeRightPanel}>X</button>
                    </div>
                </div>
                <div className="parser-content-info-content">
                    {/*{selectedResource && (*/}
                    {/*    <div>*/}

                    {/*        <p style={{color: 'white'}}>{selectedUnit.strategy}</p>*/}
                    {/*        <h2 style={{color: 'white'}}>Перемещение: {selectedUnit.movement} клеток</h2>*/}
                    {/*        <h2 style={{color: 'white'}}>Стоимость: {selectedUnit.cost.production} производста</h2>*/}
                    {/*    </div>*/}
                    {/*)}*/}
                </div>
            </div>
        </div>
    );
}

export default BuildingParser;