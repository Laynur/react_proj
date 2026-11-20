import React, { useEffect, useState } from 'react';

const QUIZ_LENGTH = 5;
const CIVILIZATIONS_URL = 'https://eyefyre.github.io/civvapi/v1/ru/civilizations/civilizations.json';
const TECHS_URL = 'https://eyefyre.github.io/civvapi/v1/ru/tech/tech.json';

function label(value) {
    return (value || '').split('|')[0].trim();
}

function shuffled(items) {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

function makeQuestion(civilizations, technologies) {
    const civRows = civilizations.filter(civ => civ.name && civ.leader?.name);
    const techRows = technologies.filter(tech => tech.name && tech.era);
    const canAskCiv = civRows.length > 1;
    const canAskTech = techRows.length > 1;
    if (!canAskCiv && !canAskTech) return null;
    const useCivQuestion = canAskCiv && (!canAskTech || Math.random() < 0.5);

    if (useCivQuestion && civRows.length > 1) {
        const civ = civRows[Math.floor(Math.random() * civRows.length)];
        const answer = label(civ.name);
        const distractors = shuffled(civRows
            .map(row => label(row.name))
            .filter(name => name && name !== answer));
        const options = shuffled([...new Set([answer, ...distractors.slice(0, 3)])]);
        return {
            prompt: `Какой державой правил ${label(civ.leader.name)}?`,
            answer,
            options,
        };
    }

    if (techRows.length > 1) {
        const tech = techRows[Math.floor(Math.random() * techRows.length)];
        const answer = label(tech.era);
        const distractors = shuffled([...new Set(techRows.map(row => label(row.era)).filter(era => era && era !== answer))]);
        return {
            prompt: `В какой эпохе открывается технология «${label(tech.name)}»?`,
            answer,
            options: shuffled([...new Set([answer, ...distractors.slice(0, 3)])]),
        };
    }

    return null;
}

function QuizSection() {
    const [quizData, setQuizData] = useState(null);
    const [loadError, setLoadError] = useState(false);
    const [reloadKey, setReloadKey] = useState(0);
    const [mode, setMode] = useState('ready');
    const [question, setQuestion] = useState(null);
    const [questionNumber, setQuestionNumber] = useState(1);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);

    useEffect(() => {
        const controller = new AbortController();
        setLoadError(false);

        Promise.all([CIVILIZATIONS_URL, TECHS_URL].map(async url => {
            const response = await fetch(url, { signal: controller.signal });
            if (!response.ok) throw new Error('Quiz data could not be loaded');
            return response.json();
        }))
            .then(([civilizations, technologies]) => {
                setQuizData({ civilizations, technologies });
            })
            .catch(error => {
                if (error.name !== 'AbortError') setLoadError(true);
            });

        return () => controller.abort();
    }, [reloadKey]);

    const startQuiz = () => {
        const firstQuestion = makeQuestion(quizData.civilizations, quizData.technologies);
        if (!firstQuestion) return;
        setQuestion(firstQuestion);
        setQuestionNumber(1);
        setSelectedAnswer(null);
        setScore(0);
        setMode('playing');
    };

    const chooseAnswer = answer => {
        if (selectedAnswer !== null) return;
        setSelectedAnswer(answer);
        if (answer === question.answer) setScore(current => current + 1);
    };

    const nextQuestion = () => {
        if (questionNumber >= QUIZ_LENGTH) {
            setMode('finished');
            return;
        }
        setQuestion(makeQuestion(quizData.civilizations, quizData.technologies));
        setQuestionNumber(current => current + 1);
        setSelectedAnswer(null);
    };

    return (
        <section className="quiz-panel liquid-glass" aria-labelledby="quiz-title">
            <div className="quiz-heading">
                <div>
                    <p className="content-eyebrow">Проверь себя</p>
                    <h2 id="quiz-title">Мини-квиз Civilization V</h2>
                    <p className="quiz-description">Пять коротких вопросов о лидерах и технологиях. Каждый раунд новый.</p>
                </div>
                <span className="quiz-mark" aria-hidden="true">?</span>
            </div>

            {loadError ? (
                <div className="quiz-status" role="status">
                    <p>Не удалось загрузить вопросы. Проверь соединение и попробуй ещё раз.</p>
                    <button type="button" className="quiz-action" onClick={() => setReloadKey(current => current + 1)}>Повторить</button>
                </div>
            ) : !quizData ? (
                <p className="quiz-status" role="status">Загружаем вопросы…</p>
            ) : mode === 'ready' ? (
                <div className="quiz-start-row">
                    <p>Угадай державу по лидеру или определи эпоху технологии.</p>
                    <button type="button" className="quiz-action" onClick={startQuiz}>Начать квиз <span aria-hidden="true">→</span></button>
                </div>
            ) : mode === 'finished' ? (
                <div className="quiz-finished" role="status" aria-live="polite">
                    <div><strong>{score} из {QUIZ_LENGTH}</strong><span> правильных ответов</span></div>
                    <button type="button" className="quiz-action" onClick={startQuiz}>Сыграть ещё</button>
                </div>
            ) : (
                <div className="quiz-game">
                    <div className="quiz-progress">
                        <span>Вопрос {questionNumber} из {QUIZ_LENGTH}</span>
                        <span>Счёт: {score}</span>
                    </div>
                    <h3 className="quiz-question">{question.prompt}</h3>
                    <div className="quiz-options">
                        {question.options.map(option => {
                            const isAnswer = option === question.answer;
                            const isSelectedWrong = selectedAnswer === option && !isAnswer;
                            const stateClass = selectedAnswer === null ? '' : isAnswer ? ' is-correct' : isSelectedWrong ? ' is-wrong' : '';
                            return (
                                <button
                                    key={option}
                                    type="button"
                                    className={`quiz-option${stateClass}`}
                                    onClick={() => chooseAnswer(option)}
                                    disabled={selectedAnswer !== null}
                                >
                                    {option}
                                </button>
                            );
                        })}
                    </div>
                    {selectedAnswer !== null && (
                        <div className="quiz-feedback" role="status" aria-live="polite">
                            <p>{selectedAnswer === question.answer ? 'Верно! Хорошо знаешь историю.' : `Не совсем. Правильный ответ: ${question.answer}.`}</p>
                            <button type="button" className="quiz-action" onClick={nextQuestion}>
                                {questionNumber === QUIZ_LENGTH ? 'Итоги' : 'Дальше'} <span aria-hidden="true">→</span>
                            </button>
                        </div>
                    )}
                </div>
            )}
        </section>
    );
}

export default QuizSection;
