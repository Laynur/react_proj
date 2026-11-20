import React, { useState, useEffect } from 'react';
import Tilt from 'react-parallax-tilt';
import { Text } from '@consta/uikit/Text';
import Modal from './Modal';
import LibraryTile from './LibraryTile';

const eras = ['Древнейший мир', 'Античность', 'Средневековье', 'Новое время', 'Новейшее время', 'Современность', 'Эпоха атома', 'Информационная эра'];

function TechParser() {
    const [techs, setTechs] = useState([]);
    const [selectedTech, setSelectedTech] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('https://eyefyre.github.io/civvapi/v1/ru/tech/tech.json')
            .then(response => response.json())
            .then(data => setTechs(data));
    }, []);

    const filteredTechs = techs.filter(tech => tech.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="parser-content-page">
            <div className="parser-content-nameandsearch">
                <Text view="normal" size="3xl" weight="black" spacing="l">Технологии</Text>
                <input className="parser-content-nameandsearch-search" placeholder="Поиск" value={searchTerm} onChange={event => setSearchTerm(event.target.value)} />
            </div>
            {eras.map(era => {
                const eraTechs = filteredTechs.filter(tech => tech.era.split('|')[0] === era);
                if (!eraTechs.length) return null;
                return (
                    <section className="era-section" key={era}>
                        <h2>{era}</h2>
                        <div className="parser-content">
                            {eraTechs.map(tech => (
                                <Tilt key={tech.id}>
                                    <LibraryTile
                                        title={tech.name.split('|')[0]}
                                        icon={tech.icon}
                                        detail={[tech.era?.split('|')[0], tech.cost != null ? `${tech.cost} науки` : null].filter(Boolean).join(' · ')}
                                        onClick={() => setSelectedTech(tech)}
                                    />
                                </Tilt>
                            ))}
                        </div>
                    </section>
                );
            })}

            {selectedTech && (
                <Modal title={selectedTech.name.split('|')[0]} icon={selectedTech.icon} onClose={() => setSelectedTech(null)}>
                    <section className="modal-facts">
                        <div><span>Эпоха</span><strong>{selectedTech.era.split('|')[0]}</strong></div>
                        <div><span>Стоимость</span><strong>{selectedTech.cost} очков науки</strong></div>
                    </section>
                    <section className="modal-section"><p>{selectedTech.civilopedia_entry}</p></section>
                    <section className="modal-section">
                        <h3>Открывает технологии</h3>
                        {selectedTech.tech_unlocks?.length ? <ul>{selectedTech.tech_unlocks.map(tech => <li key={tech.name}>{tech.name.split('|')[0]}</li>)}</ul> : <p>Нет последующих технологий</p>}
                    </section>
                    <section className="modal-section">
                        <h3>Открывает юниты</h3>
                        {selectedTech.unit_unlocks?.length ? <ul>{selectedTech.unit_unlocks.map(unit => <li key={unit.name}>{unit.name.split('|')[0]}</li>)}</ul> : <p>Нет связанных юнитов</p>}
                    </section>
                </Modal>
            )}
        </div>
    );
}

export default TechParser;
