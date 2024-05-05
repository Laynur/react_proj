import React, { useState, useEffect } from 'react';
import Tilt from 'react-parallax-tilt';
function UnitsParser() {
    const [units, setUnits] = useState([]);
    const [selectedUnit, setSelectedUnit] = useState(null);
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        fetch('https://eyefyre.github.io/civvapi/v1/ru/units/units.json')
            .then(response => response.json())
            .then(data => setUnits(data));
    }, []);
    const ModalWind = (unit) =>{
        setShowModal(true)
        setSelectedUnit(unit)
    }
    const closeModalWind = ()=>{
        setShowModal(false)
    }
    return (
        <div className="parser-content-page">
            <div >
                <h1 style={{color:'white'}}>Список Юнитов</h1>
                <div className="parser-content">

                    {units.map(unit => (
                        <Tilt>
                        <div className="parser-content-block" key={unit.id} onClick={()=>ModalWind(unit)}>
                            <img src={unit.icon} alt={unit.name}/>
                            <p style={{color: 'white'}}>{unit.name.split('|')[0]}</p>
                        </div>
                        </Tilt>
                    ))}
                </div>
            </div>
            {showModal && (
                <div className="modal">
                    <div className="modal-container">
                        <div className="parser-content-info-header">
                            {selectedUnit && (
                                <div className="parser-content-info-header-gameinfo">
                                    <h2 style={{color: 'white'}}>{selectedUnit.name.split('|')[0]}</h2>
                                    <img src={selectedUnit.icon}/>
                                </div>
                            )}
                            <div>
                                <button className="parser-content-info-header-exit" onClick={closeModalWind}>X</button>
                            </div>
                        </div>
                        <div className="parser-content-info-content">
                            {selectedUnit && (
                                <>
                                    <div>
                                        <h3 style={{color:'white'}}>{selectedUnit.game_info}</h3>
                                    </div>
                                    <div>
                                        <h3 style={{color:'white'}}>Стоимость: {selectedUnit.cost.production} ед. производства</h3>
                                    </div>
                                    <div>
                                        <h3 style={{color:'white'}}>Количество перемещений: {selectedUnit.movement}</h3>
                                    </div>
                                    <div>
                                        <h3 style={{color:'white'}}>Совет: {selectedUnit.strategy}</h3>
                                    </div>
                                    <div>
                                        <h3 style={{color:'white'}}>Необходимо исследовать: {selectedUnit.prereq_tech.name.split('|')[0]}</h3>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UnitsParser;