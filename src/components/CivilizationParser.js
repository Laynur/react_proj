import React, { useState, useEffect } from 'react';
import Tilt from 'react-parallax-tilt';
import {Text} from '@consta/uikit/TextDeprecated';
function CivilizationParser() {
    const [civilizations, setCivilization] = useState([]);
    const [selectedCivilization, setSelectedCivilization] = useState(null);
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        fetch('https://eyefyre.github.io/civvapi/v1/ru/civilizations/civilizations.json')
            .then(response => response.json())
            .then(data => setCivilization(data));
    }, []);

    const ModalWind = (civilization) => {
        setShowModal(true)
        setSelectedCivilization(civilization)
    }
    const closeModalWind = () =>{
        setShowModal(false)
    }
    return (
        <div className="parser-content-page">
            <div>
                <div className="parser-content-nameandsearch">
                    {/*<h1 style={{color:'white'}}>Цивилизации</h1>*/}
                    <Text view="normal" size="3xl" weight="black" spacing="l">Цивилизации</Text>
                    <input />
                </div>
                <div className="parser-content">

                    {civilizations.map(civilization => (

                        <Tilt>
                            <div className="parser-content-block" key={civilization.id}
                                 onClick={() => ModalWind(civilization)}>
                                <img src={civilization.icon} alt={civilization.name}/>
                                {/*<p style={{color: 'white'}}>{civilization.name.split('|')[0]}</p>*/}
                                <Text view="normal" size="xl" font="mono" weight="semibold"
                                spacing="m" align="center">{civilization.name.split('|')[0]}</Text>
                            </div>
                        </Tilt>
                    ))}
                </div>
            </div>
            {showModal && (
                <div className="modal">
                    <div className="modal-container">
                        <div className="parser-content-info-header">
                            {selectedCivilization && (

                                <div className="parser-content-info-header-gameinfo">
                                    <h2 style={{color: 'white'}}>{selectedCivilization.name.split('|')[0]}</h2>
                                    <img src={selectedCivilization.icon}/>
                                </div>


                            )}
                            <div>
                                <button className="parser-content-info-header-exit" onClick={closeModalWind}>X</button>
                            </div>
                        </div>
                        <div className="parser-content-info-content">
                            {selectedCivilization && (
                                <>
                                    <div className="parser-content-info-content-leaderinfo">
                                        <div className="parser-content-info-content-leaderinfo_name_img">
                                            <h2 style={{color: 'white'}}>Лидер: {selectedCivilization.leader.name}</h2>
                                            <img src={selectedCivilization.leader.icon} />
                                            <h3 style={{color: 'white'}}>Годы жизни: {selectedCivilization.leader.lived}</h3>
                                        </div>
                                        <div className="parser-content-info-content-leaderinfo_title">
                                            <h3 style={{color: 'white'}}>{selectedCivilization.leader.titles[0]}</h3>
                                            <h3 style={{color: 'white'}}>{selectedCivilization.leader.titles[1]}</h3>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 style={{color: 'white'}}>{selectedCivilization.dawn_of_man}</h3>
                                    </div>
                                    <div>
                                        <h2 style={{color: 'white'}}>Города:</h2>
                                        <h3 style={{color: 'white'}}>{selectedCivilization.city_names.join(', ')}</h3>
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

export default CivilizationParser;