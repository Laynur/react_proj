import React, { useState, useEffect } from 'react';
import Tilt from 'react-parallax-tilt';
import {Text} from "@consta/uikit/Text";
import Modal from './Modal';
import LibraryTile from './LibraryTile';
function UnitsParser() {
    const [units, setUnits] = useState([]);
    const [selectedUnit, setSelectedUnit] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState('');
    const [reloadKey, setReloadKey] = useState(0);

    useEffect(() => {
        const controller = new AbortController();
        setIsLoading(true);
        setLoadError('');

        fetch('https://eyefyre.github.io/civvapi/v1/ru/units/units.json', { signal: controller.signal })
            .then(response => {
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                return response.json();
            })
            .then(data => {
                if (!Array.isArray(data)) throw new Error('Некорректный формат данных');
                setUnits(data);
            })
            .catch(error => {
                if (!controller.signal.aborted) {
                    setLoadError('Не удалось загрузить список юнитов. Проверьте соединение и попробуйте ещё раз.');
                }
            })
            .finally(() => {
                if (!controller.signal.aborted) setIsLoading(false);
            });

        return () => controller.abort();
    }, [reloadKey]);
    const ModalWind = (unit) =>{
        setShowModal(true)
        setSelectedUnit(unit)
    }
    const closeModalWind = ()=>{
        setShowModal(false)
    }
    const filteredUnits = units.filter(unit =>
        unit?.name && unit.name.toLowerCase().includes(searchTerm.toLowerCase())
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
            {loadError ? (
                <div className="parser-error" role="alert">
                    <p>{loadError}</p>
                    <button type="button" onClick={() => setReloadKey(current => current + 1)}>Повторить</button>
                </div>
            ) : isLoading ? (
                <p className="parser-status" role="status">Загружаем юнитов…</p>
            ) : (
                <div className="parser-content">
                    {filteredUnits.map(unit => (
                        <Tilt key={unit.id}>
                            <LibraryTile
                                title={unit.name.split('|')[0]}
                                icon={unit.icon}
                                detail={[
                                    unit.cost?.production != null ? `${unit.cost.production} пр-ва` : null,
                                    unit.movement != null ? `${unit.movement} ход.` : null,
                                ].filter(Boolean).join(' · ') || unit.game_info}
                                onClick={() => ModalWind(unit)}
                            />
                        </Tilt>
                    ))}
                    {filteredUnits.length === 0 && <p className="parser-status">Юниты не найдены.</p>}
                </div>
            )}

            {showModal && selectedUnit && (
                <Modal title={selectedUnit.name?.split('|')[0] || 'Юнит'} icon={selectedUnit.icon} onClose={closeModalWind}>
                    <section className="modal-section"><p>{selectedUnit.game_info || 'Описание отсутствует.'}</p></section>
                    <section className="modal-facts">
                        <div><span>Стоимость</span><strong>{selectedUnit.cost?.production ?? '—'} ед. производства</strong></div>
                        <div><span>Перемещение</span><strong>{selectedUnit.movement ?? '—'}</strong></div>
                        <div><span>Требуемая технология</span><strong>{selectedUnit.prereq_tech?.name?.split('|')[0] || 'Не требуется'}</strong></div>
                    </section>
                    <section className="modal-section"><h3>Совет</h3><p>{selectedUnit.strategy || 'Совет отсутствует.'}</p></section>
                </Modal>
            )}
        </div>
    );
}

export default UnitsParser;
