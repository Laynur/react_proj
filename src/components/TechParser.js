import React, { useState, useEffect } from 'react';
import Tilt from 'react-parallax-tilt';
import {Text} from '@consta/uikit/Text';
function TechParser() {
    const [techs, setTech] = useState([]);
    const [selectedTech, setSelectedTech] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
        fetch('https://eyefyre.github.io/civvapi/v1/ru/tech/tech.json')
            .then(response => response.json())
            .then(data => setTech(data));
    }, []);
    const ModalWind = (unit) =>{
        setShowModal(true)
        setSelectedTech(unit)
    }
    const closeModalWind = ()=>{
        setShowModal(false)
    }
    const eraList = ['Древнейший мир',
        'Античность','Средневековье','Новое время','Новейшее время',
    'Современность','Эпоха атома', 'Информационная эра']
    const filteredTech = techs.filter(tech =>
        tech.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <div className="parser-content-page">
            <div>
                <div className="parser-content-nameandsearch">
                    {/*<h1 style={{color:'white'}}>Технологии</h1>*/}
                    <Text view="normal" size="3xl" weight="black" spacing="l">Технологии</Text>
                    <input
                        className="parser-content-nameandsearch-search"
                        placeholder="Поиск"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                {eraList.map(era => (
                    <div style={{border: '5px dashed cyan'}} >
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            {/*<h2 style={{color: 'white'}}>{era}</h2>*/}
                            <Text view="normal" size="2xl" weight="black" spacing="l">{era}</Text>
                        </div>
                        <div className="parser-content">
                            {filteredTech.filter(tech => tech.era.split('|')[0] === era).map(tech => (
                                <Tilt>
                                    <div className="parser-content-block" onClick={() => ModalWind(tech)}>
                                        <img src={tech.icon} alt={tech.name}/>
                                        {/*<p style={{color: 'white'}}>{tech.name.split('|')[0]}</p>*/}
                                        <Text view="normal" size="xl" font="mono" weight="semibold"
                                              spacing="m" align="center">{tech.name.split('|')[0]}</Text>
                                    </div>
                                </Tilt>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            {showModal && (
                <div  className="modal">
                    <div className="modal-container">
                        <div className="parser-content-info-header">
                            {selectedTech && (

                                <div className="parser-content-info-header-gameinfo">
                                    <h2 style={{color: 'white'}}>{selectedTech.name.split('|')[0]}</h2>
                                    <img src={selectedTech.icon}/>
                                </div>

                            )}
                            <div>
                                <button className="parser-content-info-header-exit" onClick={closeModalWind}>X</button>
                            </div>
                        </div>
                        <div className="parser-content-info-content">
                            {selectedTech && (
                                <div>
                                    <h3 style={{color: 'white'}}>{selectedTech.era.split('|')[0]}</h3>
                                    <ul style={{color: 'white'}}>
                                        <h3>{selectedTech.civilopedia_entry}
                                        </h3>
                                    </ul>
                                    <h3 style={{color: 'white'}}>Стоимость: {selectedTech.cost} производста</h3>
                                    <h3 style={{color: 'white'}}>Открывает следующие технологии:</h3>
                                    {selectedTech.tech_unlocks.map(tech => (
                                        <ul style={{color: 'white'}}>
                                            <h3>
                                            - {tech.name.split('|')[0]}
                                            </h3>
                                        </ul>
                                    ))}
                                    <h3 style={{color: 'white'}}>Открывает следующие юниты:</h3>
                                    {selectedTech.unit_unlocks.map(unit => (
                                        <ul  style={{color: 'white'}}>
                                            <h3>
                                                - {unit.name.split('|')[0]}
                                            </h3>
                                        </ul>
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

export default TechParser;