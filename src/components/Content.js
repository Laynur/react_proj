import React from 'react';
import { NavLink } from 'react-router-dom';
import QuizSection from './QuizSection';

const sections = [
    { path: '/civpage', title: 'Цивилизации', description: 'Державы и их лидеры', icon: 'civ' },
    { path: '/unitpage', title: 'Юниты', description: 'Армия и флот', icon: 'unit' },
    { path: '/resourcepage', title: 'Ресурсы', description: 'Богатства мира', icon: 'resource' },
    { path: '/techpage', title: 'Технологии', description: 'Путь через эпохи', icon: 'tech' },
    { path: '/buildingpage', title: 'Здания', description: 'Города и чудеса', icon: 'building' },
];

function CategoryIcon({ name }) {
    const paths = {
        civ: <><path d="M3 21h18M5 21V10l7-6 7 6v11M9 21v-6h6v6" /><path d="M9 10h.01M15 10h.01" /></>,
        unit: <><path d="m14 5 5-2-2 5-8 8-4-4 8-8Z" /><path d="m6 14-3 7 7-3M14 10l4 4M5 8l3 3M12 5l3 3" /></>,
        resource: <><path d="M12 3 3.5 12 12 21l8.5-9L12 3Z" /><path d="m8 12 2.5 2.5L16 9" /></>,
        tech: <><path d="M9 18h6M10 22h4M8.5 14.5a7 7 0 1 1 7 0c-.8.6-1.2 1.3-1.4 2.5h-4.2c-.2-1.2-.6-1.9-1.4-2.5Z" /><path d="M12 5v2M5.5 8l1.5 1M18.5 8 17 9" /></>,
        building: <><path d="M4 21V6l8-3 8 3v15M2 21h20M8 9h1M15 9h1M8 13h1M15 13h1M10 21v-4h4v4" /></>,
    };

    return (
        <svg className="content-block-blk-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {paths[name]}
        </svg>
    );
}

function Content() {
    return (
        <main
            className="content-block"
            style={{ '--home-background': `url(${process.env.PUBLIC_URL}/img/content_block_place.jpg)` }}
        >
            <div className="content-intro">
                <h1 className="content-title">История начинается с тебя</h1>
                <p className="content-description">
                    Изучай державы, технологии и юниты, чтобы спланировать путь к победе.
                </p>
            </div>

            <nav className="content-menu" aria-label="Разделы справочника">
                {sections.map(section => (
                    <NavLink
                        key={section.path}
                        to={section.path}
                        className="content-block-blk liquid-glass"
                    >
                        <CategoryIcon name={section.icon} />
                        <span className="content-block-blk-copy">
                            <span className="content-block-blk-text">{section.title}</span>
                            <span className="content-block-blk-description">{section.description}</span>
                        </span>
                        <span className="content-block-blk-arrow" aria-hidden="true">↗</span>
                    </NavLink>
                ))}
            </nav>

            <QuizSection />
        </main>
    );
}

export default Content;
