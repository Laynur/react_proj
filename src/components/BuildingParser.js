import React, { useState, useEffect } from 'react';
import Tilt from 'react-parallax-tilt';
import { Text } from '@consta/uikit/Text';
import Modal from './Modal';
import LibraryTile from './LibraryTile';

function BuildingParser() {
    const [buildings, setBuildings] = useState([]);
    const [selectedBuilding, setSelectedBuilding] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('https://eyefyre.github.io/civvapi/v1/ru/buildings/buildings.json')
            .then(response => response.json())
            .then(data => setBuildings(data));
    }, []);

    const filteredBuildings = buildings.filter(building =>
        building.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="parser-content-page">
            <div className="parser-content-nameandsearch">
                <Text view="normal" size="3xl" weight="black" spacing="l">Здания</Text>
                <input className="parser-content-nameandsearch-search" placeholder="Поиск" value={searchTerm} onChange={event => setSearchTerm(event.target.value)} />
            </div>
            <div className="parser-content">
                {filteredBuildings.map(building => (
                    <Tilt key={building.id}>
                        <LibraryTile
                            title={building.name.split('|')[0]}
                            icon={building.icon}
                            detail={[
                                building.cost?.production != null ? `${building.cost.production} пр-ва` : null,
                                building.gold_maintenance != null ? `${building.gold_maintenance} золота/ход` : null,
                            ].filter(Boolean).join(' · ')}
                            onClick={() => setSelectedBuilding(building)}
                        />
                    </Tilt>
                ))}
            </div>

            {selectedBuilding && (
                <Modal title={selectedBuilding.name.split('|')[0]} icon={selectedBuilding.icon} onClose={() => setSelectedBuilding(null)}>
                    <section className="modal-section"><p>{selectedBuilding.game_info}</p></section>
                    <section className="modal-facts">
                        <div><span>Стоимость</span><strong>{selectedBuilding.cost.production} ед. производства</strong></div>
                        <div><span>Обслуживание</span><strong>{selectedBuilding.gold_maintenance} ед. золота</strong></div>
                    </section>
                    <section className="modal-section"><h3>Совет</h3><p>{selectedBuilding.strategy}</p></section>
                </Modal>
            )}
        </div>
    );
}

export default BuildingParser;
