import React, { useState, useEffect } from 'react';
import Tilt from 'react-parallax-tilt';
import {Text} from "@consta/uikit/Text";
function ResourcesParser() {
    const [resources, setResources] = useState([]);
    const [selectedResource, setSelectedResource] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
        fetch('https://eyefyre.github.io/civvapi/v1/ru/resources/resources.json')
            .then(response => response.json())
            .then(data => setResources(data));
    }, []);
    const ModalWind = (civilization) => {
        setShowModal(true)
        setSelectedResource(civilization)
    }
    const closeModalWind = () =>{
        setShowModal(false)
    }
    const filteredRes = resources.filter(resource =>
        resource.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <div className="parser-content-page">
            <div>
                <div className="parser-content-nameandsearch">
                    <Text view="normal" size="3xl" weight="black" spacing="l">Ресурсы</Text>
                    <input
                        className="parser-content-nameandsearch-search"
                        placeholder="Поиск"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="parser-content">

                    {filteredRes.map(resource => (
                        <Tilt>
                            <div className="parser-content-block" onClick={()=>ModalWind(resource)}>
                                <img src={resource.icon} alt={resource.name}/>
                                {/*<p style={{color: 'white'}}>{resource.name.split('|')[0]}</p>*/}
                                <Text view="normal" size="xl" font="mono" weight="semibold"
                                      spacing="m" align="center">{resource.name.split('|')[0]}</Text>
                            </div>
                        </Tilt>
                    ))}
                </div>
            </div>

            {showModal && (
                <div  className="modal">
                    <div className="modal-container">
                        <div className="parser-content-info-header">
                            {selectedResource && selectedResource.name != null && (
                                <div className="parser-content-info-header-gameinfo">
                                    <h2 style={{color: 'white'}}>{selectedResource.name.split('|')[0]}</h2>
                                    <img src={selectedResource.icon}/>
                                </div>

                            )}
                            <div>
                                <button className="parser-content-info-header-exit" onClick={closeModalWind}>X</button>
                            </div>
                        </div>
                        <div className="parser-content-info-content">
                            {selectedResource &&(
                                <div>
                                    <h3 style={{color: 'white'}}>Исторический факт: {selectedResource.historical_info}</h3>
                                    <h3 style={{color: 'white'}}>Где используется: {selectedResource.game_info}</h3>
                                    {selectedResource.prereq_tech != null &&<h3 style={{color: 'white'}}>Предпосылки к
                                        открытиям: {selectedResource.prereq_tech.name.split('|')[0]} клеток</h3>}
                                    <h3 style={{color:'white'}}>Где можно встретить:</h3>
                                    {selectedResource.terrains_found_on != null && selectedResource.terrains_found_on.map(terr=>(
                                        <ul key={terr.name} style={{color:'white'}}> - {terr.name.split('|')[0]}</ul>
                                    ))}
                                </div>
                                )}
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default ResourcesParser;