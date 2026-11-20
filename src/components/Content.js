import React from 'react';
import { NavLink } from 'react-router-dom';
import QuizSection from './QuizSection';

const sections = [
    { path: '/civpage', title: 'Цивилизации', description: 'Державы и их лидеры', className: 'civ' },
    { path: '/unitpage', title: 'Юниты', description: 'Армия и флот', className: 'unit' },
    { path: '/resourcepage', title: 'Ресурсы', description: 'Богатства мира', className: 'resour' },
    { path: '/techpage', title: 'Технологии', description: 'Путь через эпохи', className: 'tech' },
    { path: '/buildingpage', title: 'Здания', description: 'Города и чудеса', className: 'building' },
];

function Content() {
    return (
        <main
            className="content-block"
            style={{ '--home-background': `url(${process.env.PUBLIC_URL}/img/civ_content.jpg)` }}
        >
            <div className="content-intro">
                <p className="content-eyebrow">Civilization V · справочник</p>
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
                        className={`content-block-blk content-block-blk-${section.className} liquid-glass`}
                    >
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
