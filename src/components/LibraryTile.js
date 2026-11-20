import React from 'react';

function LibraryTile({ title, icon, detail, onClick }) {
    return (
        <button type="button" className="parser-content-block" onClick={onClick}>
            <img src={icon} alt="" />
            <span className="library-tile-title">{title}</span>
            {detail && <span className="library-tile-meta">{detail}</span>}
        </button>
    );
}

export default LibraryTile;
