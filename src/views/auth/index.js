import React, { useContext, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { Service } from '../../services/context';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import BackgroundLight from './../../components/background-light/index';
import { setCookie } from '../../utils/cookieManager';

function Auth() {
    const service = useContext(Service);

    const [mode, setMode] = useState(0);

    const navigate = useNavigate();

    const handler = {
        auth: () => {
            window.open(
                'https://shikimori.one/oauth/authorize?client_id=3ejSu5YHMfo_mN5h7O2_dBvWaWDRYbEjyDZFn02G09Y&redirect_uri=https%3A%2F%2Flocalhost%3A3000%2Fauth&response_type=code&scope='
            );
        },
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code')
        if (code) {
            setMode(1);

            AuthCheck(code);
        }
    }, []);

    const AuthCheck = async (code) => {
        const data = await service.shikimori.getToken(code);
        
        setCookie("access_token", data.access_token)
        setCookie("refresh_token", data.refresh_token)

        navigate("/");
    }

    return (
        <>
            <BackgroundLight />
            {mode === 0 ? (
                <main className={styles.main}>
                    <h1 className={styles.main__title}>
                        Чтобы начать подбор аниме, нужно авторизоваться через
                        Shikimori
                    </h1>
                    <button
                        className={styles.main__button}
                        onClick={handler.auth}
                    >
                        АВТОРИЗОВАТЬСЯ
                    </button>
                    <div className={styles.main__info}>
                        <span>
                            Сайт использует{' '}
                            <a href='https://shikimori.one'>shikimori</a> API
                            для поиска аниме
                        </span>
                        <span>
                            А также сайт использует Cookie, авторизовываясь на
                            сайте вы разрешаете использование Cookie
                        </span>
                    </div>
                </main>
            ) : undefined}
        </>
    );
}

export default observer(Auth);
