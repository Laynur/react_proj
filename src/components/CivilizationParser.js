import React, { useState, useEffect } from 'react';

function CivilizationParser() {
    const [civilizations, setCivilizations] = useState([]);

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

    return (
        <div>
            <h1>Цивилизации</h1>
            <div className="civilization-parser">
                {civilizations.map((civ, index) => (
                    <div key={index} className="civilization-parser-civic">
                        <label className="civilization-parser-civic-label">
                            {civ.name}
                        </label>
                        <img className="civilization-parser-civic-img" src={civ.icon}/>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CivilizationParser;