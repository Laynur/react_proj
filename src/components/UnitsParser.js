import React, { useState, useEffect } from 'react';

function UnitsParser() {
    const [units, setUnits] = useState([]);
    const [displayEl, setDisplayEl] = useState('none');
    const [widthSize, setWidthSize] = useState('1920px');
    const [selectedUnit, setSelectedUnit] = useState(null);
    useEffect(() => {
        fetch('https://eyefyre.github.io/civvapi/v1/ru/units/units.json')
            .then(response => response.json())
            .then(data => setUnits(data));
    }, []);
    const rightPanel = (unit) =>{
        setWidthSize('960px')
        setDisplayEl('block')
        setSelectedUnit(unit)
    }
    const closeRightPanel = () => {
        setDisplayEl('none')
        setWidthSize('1920px')
    }
    return (
        <div className="parser-content-page">
            <div style={{width:widthSize}}>
                <h1 style={{color:'white'}}>Список Юнитов</h1>
                <div className="parser-content">

                    {units.map(unit => (
                        <div className="parser-content-block" key={unit.id} onClick={()=>rightPanel(unit)}>
                            <img src={unit.icon} alt={unit.name}/>
                            <p style={{color: 'white'}}>{unit.name.split('|')[0]}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div style={{display: displayEl}} className="parser-content-info">
                <div className="parser-content-info-header">
                    {selectedUnit && (
                        <div className="parser-content-info-header-gameinfo">
                            <div>
                                <h2 style={{color: 'white'}}>{selectedUnit.name.split('|')[0]}</h2>
                                <img src={selectedUnit.icon}/>
                            </div>
                            <div>
                                <h2 style={{color: 'white'}}>{selectedUnit.game_info}</h2>
                            </div>
                        </div>

                    )}
                    <div>
                        <button onClick={closeRightPanel}>X</button>
                    </div>
                </div>
                <div className="parser-content-info-content">
                    {selectedUnit && (
                        <div>

                            <p style={{color: 'white'}}>{selectedUnit.strategy}</p>
                            <h2 style={{color: 'white'}}>Перемещение: {selectedUnit.movement} клеток</h2>
                            <h2 style={{color: 'white'}}>Стоимость: {selectedUnit.cost.production} производста</h2>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UnitsParser;