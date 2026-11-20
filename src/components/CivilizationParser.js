import React, { useState, useEffect } from 'react';
import Tilt from 'react-parallax-tilt';
import { Text } from '@consta/uikit/Text';
import Modal from './Modal';
import LibraryTile from './LibraryTile';

function CivilizationParser() {
    const [civilizations, setCivilization] = useState([]);
    const [selectedCivilization, setSelectedCivilization] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('https://eyefyre.github.io/civvapi/v1/ru/civilizations/civilizations.json')
            .then(response => response.json())
            .then(data => setCivilization(data));
    }, []);

    const ModalWind = (civilization) => {
        setShowModal(true);
        setSelectedCivilization(civilization);
    };

    const closeModalWind = () => {
        setShowModal(false);
    };

    const filteredCivilizations = civilizations.filter(civilization =>
        civilization.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="parser-content-page">

            <div className="parser-content-nameandsearch">
                <Text view="normal" size="3xl" weight="black" spacing="l">Цивилизации</Text>
                <input
                    className="parser-content-nameandsearch-search"
                    placeholder="Поиск"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="parser-content">
                {filteredCivilizations.map(civilization => (
                    <Tilt key={civilization.id}>
                        <LibraryTile
                            title={civilization.name.split('|')[0]}
                            icon={civilization.icon}
                            detail={civilization.leader?.name ? `Лидер: ${civilization.leader.name.split('|')[0]}` : null}
                            onClick={() => ModalWind(civilization)}
                        />
                    </Tilt>
                ))}
            </div>

            {showModal && selectedCivilization && (
                <Modal
                    title={selectedCivilization.name.split('|')[0]}
                    icon={selectedCivilization.icon}
                    onClose={closeModalWind}
                >
                    <section className="modal-section modal-leader">
                        <div>
                            <h3>Лидер</h3>
                            <h2>{selectedCivilization.leader.name}</h2>
                            <p>{selectedCivilization.leader.lived}</p>
                            <img src={selectedCivilization.leader.icon} alt={selectedCivilization.leader.name} />
                        </div>
                        <div className="modal-facts">
                            {selectedCivilization.leader.titles.filter(Boolean).map(title => <p key={title}>{title}</p>)}
                        </div>
                    </section>
                    <section className="modal-section">
                        <h3>История державы</h3>
                        <p>{selectedCivilization.dawn_of_man}</p>
                    </section>
                    <section className="modal-section">
                        <h3>Города</h3>
                        <p>{selectedCivilization.city_names.join(', ')}</p>
                    </section>
                </Modal>
            )}
        </div>
    );
}

export default CivilizationParser;
