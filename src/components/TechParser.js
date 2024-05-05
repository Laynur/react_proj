import React, { useState, useEffect } from 'react';
import Tilt from 'react-parallax-tilt';
function TechParser() {
    const [techs, setTech] = useState([]);
    const [selectedTech, setSelectedTech] = useState(null);
    const [showModal, setShowModal] = useState(false);
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
    return (
        <div className="parser-content-page">
            <div>

                <h1 style={{color:'white'}}>Технологии</h1>
                {eraList.map(era => (
                    <div style={{border:'5px dashed red'}} key={era}>
                        <div style={{display:'flex', justifyContent:'center'}}>
                            <h2 style={{color: 'white'}}>{era}</h2>
                        </div>
                        <div className="parser-content">
                            {techs.filter(tech => tech.era.split('|')[0] === era).map(tech => (
                                <Tilt>
                                    <div className="parser-content-block" key={tech.id} onClick={() => ModalWind(tech)}>
                                        <img src={tech.icon} alt={tech.name}/>
                                        <p style={{color: 'white'}}>{tech.name.split('|')[0]}</p>
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
                                        <ul key={tech.name} style={{color: 'white'}}>
                                            <h3>
                                            - {tech.name.split('|')[0]}
                                            </h3>
                                        </ul>
                                    ))}
                                    <h3 style={{color: 'white'}}>Открывает следующие юниты:</h3>
                                    {selectedTech.unit_unlocks.map(unit => (
                                        <ul key={unit.name} style={{color: 'white'}}>
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