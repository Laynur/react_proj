import React, { useState, useEffect } from 'react';
import Tilt from 'react-parallax-tilt';
import {Text} from "@consta/uikit/Text";
import Modal from './Modal';
function UnitsParser() {
    const [units, setUnits] = useState([]);
    const [selectedUnit, setSelectedUnit] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
        fetch('https://eyefyre.github.io/civvapi/v1/ru/units/units.json')
            .then(response => response.json())
            .then(data => setUnits(data));
    }, []);
    const ModalWind = (unit) =>{
        setShowModal(true)
        setSelectedUnit(unit)
    }
    const closeModalWind = ()=>{
        setShowModal(false)
    }
    const filteredUnits = units.filter(unit =>
        unit.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <div className="parser-content-page">

            <div className="parser-content-nameandsearch">
                <Text view="normal" size="3xl" weight="black" spacing="l">Юниты</Text>
                <input
                    className="parser-content-nameandsearch-search"
                    placeholder="Поиск"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="parser-content">

                {filteredUnits.map(unit => (
                    <Tilt key={unit.id}>
                        <button type="button" className="parser-content-block" onClick={() => ModalWind(unit)}>
                            <img src={unit.icon} alt={unit.name}/>
                            {/*<p style={{color: 'white'}}>{unit.name.split('|')[0]}</p>*/}
                            <Text view="normal" size="xl" font="mono" weight="semibold"
                                  spacing="m" align="center">{unit.name.split('|')[0]}</Text>

                        </button>
                    </Tilt>
                ))}
            </div>

            {showModal && selectedUnit && (
                <Modal title={selectedUnit.name.split('|')[0]} icon={selectedUnit.icon} onClose={closeModalWind}>
                    <section className="modal-section"><p>{selectedUnit.game_info}</p></section>
                    <section className="modal-facts">
                        <div><span>Стоимость</span><strong>{selectedUnit.cost.production} ед. производства</strong></div>
                        <div><span>Перемещение</span><strong>{selectedUnit.movement}</strong></div>
                        <div><span>Требуемая технология</span><strong>{selectedUnit.prereq_tech.name.split('|')[0]}</strong></div>
                    </section>
                    <section className="modal-section"><h3>Совет</h3><p>{selectedUnit.strategy}</p></section>
                </Modal>
            )}
        </div>
    );
}

export default UnitsParser;
