import React, { useState, useEffect } from 'react';
import Tilt from 'react-parallax-tilt';
import {Text} from "@consta/uikit/Text";
function UnitsParser() {
    const [units, setUnits] = useState([]);
    const [selectedUnit, setSelectedUnit] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
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
    const filteredUnits = units.filter(unit =>
        unit.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <div className="parser-content-page">

            <div className="parser-content-nameandsearch">
                <Text view="normal" size="3xl" weight="black" spacing="l">Юниты</Text>
                <input
                    className="parser-content-nameandsearch-search"
                    placeholder="Поиск"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="parser-content">

                {filteredUnits.map(unit => (
                    <Tilt>
                        <div className="parser-content-block" key={unit.id} onClick={() => ModalWind(unit)}>
                            <img src={unit.icon} alt={unit.name}/>
                            {/*<p style={{color: 'white'}}>{unit.name.split('|')[0]}</p>*/}
                            <Text view="normal" size="xl" font="mono" weight="semibold"
                                  spacing="m" align="center">{unit.name.split('|')[0]}</Text>

                        </div>
                    </Tilt>
                ))}
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