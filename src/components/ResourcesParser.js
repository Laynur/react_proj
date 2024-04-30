import React, { useState, useEffect } from 'react';

function ResourcesParser() {
    const [resources, setResources] = useState([]);
    const [displayEl, setDisplayEl] = useState('none');
    const [widthSize, setWidthSize] = useState('1920px');
    const [selectedResource, setSelectedResource] = useState(null);
    useEffect(() => {
        fetch('https://eyefyre.github.io/civvapi/v1/ru/resources/resources.json')
            .then(response => response.json())
            .then(data => setResources(data));
    }, []);
    const rightPanel = (resource) =>{
        setWidthSize('960px')
        setDisplayEl('block')
        setSelectedResource(resource)
    }
    const closeRightPanel = () => {
        setDisplayEl('none')
        setWidthSize('1920px')
    }
    return (
        <div className="parser-content-page">
            <div style={{width:widthSize}}>
                <h1 style={{color:'white'}}>Список ресурсов</h1>
                <div className="parser-content">

                    {resources.map(resource => (
                        <div className="parser-content-block" key={resource.id} onClick={()=>rightPanel(resource)}>
                            <img src={resource.icon} alt={resource.name}/>
                            <p style={{color: 'white'}}>{resource.name.split('|')[0]}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div style={{display: displayEl}} className="parser-content-info">
                <div className="parser-content-info-header">
                    {selectedResource && (
                        <div className="parser-content-info-header-gameinfo">
                            <div>
                                <h2 style={{color: 'white'}}>{selectedResource.name.split('|')[0]}</h2>
                                <img src={selectedResource.icon}/>
                            </div>
                            <div>
                                <h2 style={{color: 'white'}}>{selectedResource.game_info}</h2>
                            </div>
                        </div>

                    )}
                    <div>
                        <button onClick={closeRightPanel}>X</button>
                    </div>
                </div>
                <div className="parser-content-info-content">
                    {/*{selectedResource && (*/}
                    {/*    <div>*/}

                    {/*        <p style={{color: 'white'}}>{selectedUnit.strategy}</p>*/}
                    {/*        <h2 style={{color: 'white'}}>Перемещение: {selectedUnit.movement} клеток</h2>*/}
                    {/*        <h2 style={{color: 'white'}}>Стоимость: {selectedUnit.cost.production} производста</h2>*/}
                    {/*    </div>*/}
                    {/*)}*/}
                </div>
            </div>
        </div>
    );
}

export default ResourcesParser;