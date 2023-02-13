import React from 'react';
import styles from './styles.module.scss';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

function Menu() {
    const navigate = useNavigate();

    return (
        <>
            <div className={styles.container}>
                <h1>React ShizzaHo Template</h1>
                <span>На основе Create React App</span>
                <br />
                <span>Используемые технологии:</span>
                <ul>
                    <li>MobX</li>
                    <li>SASS</li>
                    <li>React Router</li>
                    <li>
                        <a href='https://github.com/ShizzaHo/React-ShizzaHo-Template'>
                            Подробнее в репозитории
                        </a>
                    </li>
                </ul>
                <br />
                <a href='#' onClick={() => { navigate('./mobx'); }} >
                    Страница с использованием MobX через менеджер сервисов
                </a>
            </div>
        </>
    );
}

export default observer(Menu);
