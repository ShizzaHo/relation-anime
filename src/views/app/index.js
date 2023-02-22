import React, { useContext, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { Service } from '../../services/context';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import BackgroundLight from '../../components/background-light';
import SearchPosterContainer from '../../components/search-poster-container';
import { getCookieParam } from './../../utils/cookieManager/index';

function App() {
    const service = useContext(Service);

    const [complete, setComplete] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = getCookieParam("access_token")
        if (!accessToken) {
            navigate("/auth");
        } else {
            tokenCheck(accessToken)
        }
    }, []);

    const tokenCheck = async (accessToken) => {
        const result = await service.shikimori.checkTokenActuality(accessToken);

        if(result){
            // все круто, можно дальше пользоваться
        } else {
            // service.shikimori.refreshToken(getCookieParam("refresh_token"));
            navigate("/auth")
        }
    }

    service.shikimori.useComplete(() => {
        setComplete(true);
    });

    const handlers = {
        editAnime: (e) => {
            setComplete(false);
        },
    };

    return (
        <>
            <BackgroundLight />
            <main className='container'>
                <div
                    className={
                        styles.completeTitle +
                        ' ' +
                        (complete ? styles.completeTitle_show : '')
                    }
                >
                    <h1>Все готово, можем начинать подбор!</h1>
                </div>
                <article className={styles.article}>
                    <section className={styles.section}>
                        <SearchPosterContainer
                            title='Выберите первое аниме'
                            position={1}
                            isComplete={complete}
                        />
                    </section>
                    <section className={styles.section}>
                        <SearchPosterContainer
                            title='И не забудьте про второе'
                            position={2}
                            isComplete={complete}
                        />
                    </section>
                </article>
                <div
                    className={
                        styles.completeControl +
                        ' ' +
                        (complete ? styles.completeControl_show : '')
                    }
                >
                    <div>
                        <button>НАЧАТЬ ПОДБОР АНИМЕ</button>
                        <span onClick={handlers.editAnime}>ИЗМЕНИТЬ ВЫБОР</span>
                    </div>
                </div>
            </main>
        </>
    );
}

export default observer(App);
