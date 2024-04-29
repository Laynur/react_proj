import React, { useState, useEffect } from 'react';

function CivilizationParser() {
    const [civilizations, setCivilizations] = useState([]);
    const [displayEl, setDisplay] = useState('none');
    const [widthSize, setWidthSize] = useState('1920px');
    const [selectedCiv, setSelectedCiv] = useState(null);
    useEffect(() => {
        const fetchCivilizations = async () => {
            try {
                const civics = [
                    'america.json',
                    'arabia.json',
                    'assyria.json',
                    'austria.json',
                    'babylon.json',
                    'brazil.json',
                    'byzantium.json',
                    'carthage.json',
                    'china.json',
                    'denmark.json',
                    'egypt.json',
                    'england.json',
                    'ethiopia.json',
                    'france.json',
                    'germany.json',
                    'greece.json',
                    'india.json',
                    'indonesia.json',
                    'japan.json',
                    'korea.json',
                    'mongolia.json',
                    'morocco.json',
                    'persia.json',
                    'poland.json',
                    'polynesia.json',
                    'portugal.json',
                    'rome.json',
                    'russia.json',
                    'siam.json',
                    'songhai.json',
                    'spain.json',
                    'sweden.json',
                    'the_aztecs.json',
                    'the_celts.json',
                    'the_huns.json',
                    'the_inca.json',
                    'the_iroquois.json',
                    'the_maya.json',
                    'the_netherlands.json',
                    'the_ottomans.json',
                    'the_shoshone.json',
                    'the_zulus.json',
                    'venice.json'
                ];

                const fetchedCivilizations = await Promise.all(
                    civics.map(async (civ) => {
                        const response = await fetch(`https://eyefyre.github.io/civvapi/v1/ru/civilizations/${civ}`);
                        const data = await response.json();
                        return data;
                    })
                );

                setCivilizations(fetchedCivilizations);
            } catch (error) {
                console.error('Error fetching civilizations:', error);
            }
        };

        fetchCivilizations();
    }, []);
    // console.log(civilizations)
    console.log(selectedCiv)
    const rightPanel = (civ) =>{
        setDisplay('block')
        setWidthSize('960px')
        setSelectedCiv(civ)

    }
    const closeRightPanel = () =>{
        setDisplay('none')
        setWidthSize('1920px')
    }
    return (
        <div className="civilization-parser-container">
            <div className="civilization-parser-civcont" style={{width:widthSize}}>
                <h1 style={{color:'white', margin:'10px', padding:'10px'}}>Цивилизации</h1>
                <div className="civilization-parser">
                    {civilizations.map((civ, index) => (
                        <div key={index} className="civilization-parser-civic" onClick={()=>rightPanel(civ)}>
                            <label className="civilization-parser-civic-label">
                                {civ.name}
                            </label>
                            <img className="civilization-parser-civic-img" src={civ.icon}/>
                        </div>
                    ))}
                </div>
            </div>
            <div style={{display: displayEl}} className="civilization-parser-info">
                <div className="civilization-parser-info-header">

                    <div style={{display:'flex'}}>
                        {selectedCiv && ( // Check if selectedCiv is not null before accessing its properties
                            <>
                                <h1>{selectedCiv.name}</h1>
                                <img className="civilization-parser-civic-img" src={selectedCiv.icon}/>
                            </>
                        )}
                    </div>
                    <button onClick={closeRightPanel}>Выйти</button>
                </div>
                <div className="civilization-parser-info-content">
                    {selectedCiv && ( // Проверяем, что selectedCiv не равен null или undefined
                        <div>
                            <h2>Лидер</h2>
                            <h3>{selectedCiv.leader.name}</h3>
                            <img src={selectedCiv.leader.icon}/>
                            <h3>Годы жизни: {selectedCiv.leader.lived}</h3>
                            <h2>Историческая справка о лидере</h2>
                            <ul>
                                {selectedCiv.leader.historical_info[1].text}
                            </ul>

                            <h2>Уникальные юниты:</h2>
                            <ul>
                                {selectedCiv.dawn_of_man}
                            </ul>
                            <h2>Города:</h2>
                            <ul>
                                {selectedCiv.city_names.join(', ')}
                            </ul>

                        </div>
                    )}
                </div>
            </div>

        </div>
    );
}

export default CivilizationParser;