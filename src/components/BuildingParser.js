import React, { useState, useEffect } from 'react';
import Tilt from 'react-parallax-tilt';
import {Text} from '@consta/uikit/Text';
function BuildingParser() {
    const [buildings, setBuilding] = useState([]);
    const [selectedBuilding, setSelectedBuilding] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
        fetch('https://eyefyre.github.io/civvapi/v1/ru/buildings/buildings.json')
            .then(response => response.json())
            .then(data => setBuilding(data));
    }, []);
    const ModalWind = (unit) =>{
        setShowModal(true)
        setSelectedBuilding(unit)
    }
    const closeModalWind = ()=>{
        setShowModal(false)
    }
    const filteredBuild = buildings.filter(build =>
        build.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <div className="parser-content-page">
            <div >
                <div className="parser-content-nameandsearch">
                    <Text view="normal" size="3xl" weight="black" spacing="l">Здания</Text>
                    <input
                        className="parser-content-nameandsearch-search"
                        placeholder="Поиск"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="parser-content">

                    {filteredBuild.map(building => (
                        <Tilt>
                            <div className="parser-content-block" onClick={()=>ModalWind(building)}>
                                <img src={building.icon} alt={building.name}/>
                                {/*<p style={{color: 'white'}}>{building.name.split('|')[0]}</p>*/}
                                <Text view="normal" size="xl" font="mono" weight="semibold"
                                      spacing="m" align="center">{building.name.split('|')[0]}</Text>
                            </div>
                        </Tilt>
                    ))}
                </div>
            </div>
            {showModal &&
                (
                <div className="modal">
                    <div className="modal-container">
                        <div className="parser-content-info-header">
                            {selectedBuilding && (
                                <div className="parser-content-info-header-gameinfo">
                                    <h2 style={{color: 'white'}}>{selectedBuilding.name.split('|')[0]}</h2>
                                    <img src={selectedBuilding.icon}/>
                                </div>

                            )}
                            <div>
                                <button className="parser-content-info-header-exit" onClick={closeModalWind}>X</button>
                            </div>
                        </div>
                        <div className="parser-content-info-content">
                            {selectedBuilding && (
                                <>
                                    <h3 style={{color: 'white'}}>{selectedBuilding.game_info}</h3>
                                    <h3 style={{color: 'white'}}>Стоимость: {selectedBuilding.cost.production} ед.
                                        производства</h3>
                                    <h3 style={{color: 'white'}}>Стоимость обслуживания: {selectedBuilding.gold_maintenance} ед.
                                        золота</h3>
                                    <h3 style={{color: 'white'}}>Совет: {selectedBuilding.strategy}</h3>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                )}
        </div>
    );
}

export default BuildingParser;