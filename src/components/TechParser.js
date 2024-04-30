import React, { useState, useEffect } from 'react';

function TechParser() {
    const [techs, setTech] = useState([]);
    const [displayEl, setDisplayEl] = useState('none');
    const [widthSize, setWidthSize] = useState('1920px');
    const [selectedTech, setSelectedTech] = useState(null);
    useEffect(() => {
        fetch('https://eyefyre.github.io/civvapi/v1/ru/tech/tech.json')
            .then(response => response.json())
            .then(data => setTech(data));
    }, []);
    const rightPanel = (tech) =>{
        setWidthSize('960px')
        setDisplayEl('block')
        setSelectedTech(tech)
    }
    const closeRightPanel = () => {
        setDisplayEl('none')
        setWidthSize('1920px')
    }
    const eraList = ['Древнейший мир',
        'Античность','Средневековье','Новое время','Новейшее время',
    'Современность','Эпоха атома', 'Информационная эра']
    return (
        <div className="parser-content-page">
            <div style={{width:widthSize}}>

                <h1 style={{color:'white'}}>Технологии</h1>
                {eraList.map(era => (
                    <div style={{border:'2px dashed red'}} key={era}>
                        <h2 style={{color: 'white'}}>{era}</h2>
                        <div className="parser-content">
                            {techs.filter(tech => tech.era.split('|')[0] === era).map(tech => (
                                <div className="parser-content-block" key={tech.id} onClick={() => rightPanel(tech)}>
                                    <img src={tech.icon} alt={tech.name}/>
                                    <p style={{color: 'white'}}>{tech.name.split('|')[0]}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div style={{display: displayEl}} className="parser-content-info">
                <div className="parser-content-info-header">
                    {selectedTech && (

                        <div className="parser-content-info-header-gameinfo">
                            <h2 style={{color: 'white'}}>{selectedTech.name.split('|')[0]}</h2>
                            <img src={selectedTech.icon}/>
                        </div>

                    )}
                    <div>
                        <button className="parser-content-info-header-exit" onClick={closeRightPanel}>X</button>
                    </div>
                </div>
                <div className="parser-content-info-content">
                    {selectedTech && (
                        <div>
                            <h3 style={{color: 'white'}}>{selectedTech.era.split('|')[0]}</h3>
                            <ul style={{color: 'white'}}>{selectedTech.civilopedia_entry}</ul>
                            <h3 style={{color: 'white'}}>Стоимость: {selectedTech.cost} производста</h3>

                            {/*<h3 style={{color: 'white'}}>Возможности:</h3>*/}

                            {/*{selectedTech.free_promotions.map(promotion => (*/}
                            {/*    <ul key={promotion.name} style={{color: 'white'}}>- {promotion.name}</ul>*/}
                            {/*))}*/}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TechParser;