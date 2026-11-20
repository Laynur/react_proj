import React, { useState, useEffect } from 'react';
import Tilt from 'react-parallax-tilt';
import { Text } from '@consta/uikit/Text';
import Modal from './Modal';

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

    const openModal = resource => {
        setSelectedResource(resource);
        setShowModal(true);
    };
    const closeModal = () => setShowModal(false);
    const filteredResources = resources.filter(resource =>
        resource.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="parser-content-page">
            <div className="parser-content-nameandsearch">
                <Text view="normal" size="3xl" weight="black" spacing="l">Ресурсы</Text>
                <input className="parser-content-nameandsearch-search" placeholder="Поиск" value={searchTerm} onChange={event => setSearchTerm(event.target.value)} />
            </div>
            <div className="parser-content">
                {filteredResources.map(resource => (
                    <Tilt key={resource.id}>
                        <button type="button" className="parser-content-block" onClick={() => openModal(resource)}>
                            <img src={resource.icon} alt={resource.name} />
                            <Text view="normal" size="xl" font="mono" weight="semibold" spacing="m" align="center">{resource.name.split('|')[0]}</Text>
                        </button>
                    </Tilt>
                ))}
            </div>

            {showModal && selectedResource && (
                <Modal title={selectedResource.name.split('|')[0]} icon={selectedResource.icon} onClose={closeModal}>
                    <section className="modal-section"><h3>Исторический факт</h3><p>{selectedResource.historical_info}</p></section>
                    <section className="modal-section"><h3>Использование в игре</h3><p>{selectedResource.game_info}</p></section>
                    {selectedResource.prereq_tech && <section className="modal-facts"><div><span>Требуемая технология</span><strong>{selectedResource.prereq_tech.name.split('|')[0]}</strong></div></section>}
                    <section className="modal-section">
                        <h3>Где встречается</h3>
                        <ul>{(selectedResource.terrains_found_on || []).map(terrain => <li key={terrain.name}>{terrain.name.split('|')[0]}</li>)}</ul>
                    </section>
                </Modal>
            )}
        </div>
    );
}

export default ResourcesParser;
