import React, { useState, useEffect } from 'react';

function CivilizationParser() {
    const [civilizations, setCivilization] = useState([]);
    const [displayEl, setDisplayEl] = useState('none');
    const [widthSize, setWidthSize] = useState('1920px');
    const [selectedCivilization, setSelectedCivilization] = useState(null);
    useEffect(() => {
        fetch('https://eyefyre.github.io/civvapi/v1/ru/civilizations/civilizations.json')
            .then(response => response.json())
            .then(data => setCivilization(data));
    }, []);
    const rightPanel = (civilization) =>{
        setWidthSize('960px')
        setDisplayEl('block')
        setSelectedCivilization(civilization)
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

                    {civilizations.map(civilization => (
                        <div className="parser-content-block" key={civilization.id} onClick={()=>rightPanel(civilization)}>
                            <img src={civilization.icon} alt={civilization.name}/>
                            <p style={{color: 'white'}}>{civilization.name.split('|')[0]}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div style={{display: displayEl}} className="parser-content-info">
                <div className="parser-content-info-header">
                    {selectedCivilization && (
                        <div className="parser-content-info-header-gameinfo">
                            <div>
                                <h2 style={{color: 'white'}}>{selectedCivilization.name.split('|')[0]}</h2>
                                <img src={selectedCivilization.icon}/>
                            </div>
                            {/*<div>*/}
                            {/*    <h2 style={{color: 'white'}}>{selectedCivilization.game_info}</h2>*/}
                            {/*</div>*/}
                        </div>

                    )}
                    <div>
                        <button onClick={closeRightPanel}>X</button>
                    </div>
                </div>
                {/*<div className="units-content-info-content">*/}
                {/*    {selectedUnit && (*/}
                {/*        <div>*/}

                {/*            <p style={{color: 'white'}}>{selectedUnit.strategy}</p>*/}
                {/*            <h2 style={{color: 'white'}}>Перемещение: {selectedUnit.movement} клеток</h2>*/}
                {/*            <h2 style={{color: 'white'}}>Стоимость: {selectedUnit.cost.production} производста</h2>*/}
                {/*        </div>*/}
                {/*    )}*/}
                {/*</div>*/}
            </div>
        </div>
    );
}

export default CivilizationParser;