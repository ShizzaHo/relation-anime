import React, { useState, useContext } from 'react';
import styles from './styles.module.scss';
import { Service } from '../../services/context';
import Poster from '../poster';

function SearchPosterContainer(props) {
    const service = useContext(Service);

    const [inputTimer, setInputTimer] = useState({});
    const [animeLists, setAnimeLists] = useState([]);
    const [selectedAnime, setSelectedAnime] = useState({});

    const onInput = (e) => {
        clearInterval(inputTimer);
        setInputTimer(
            setTimeout(() => {
                handlers.onInputChange(e);
            }, 1000)
        );
    };

    service.shikimori.useFindedAnime((array) => {
        setAnimeLists(array);
    });

    const handlers = {
        onInputChange: (e) => {
            const value = e.target.value;
            setSelectedAnime({});
            service.shikimori.searchAnime(value, 10);
        },
    };

    const callbacks = {
        selectedAnime: (item) => {
            service.shikimori.setAnime(props.position, item);
            console.log(item);
            setSelectedAnime({
                title: item.russian,
                originalTitle: item.name,
                image: item.image.original,
            });
        },
    };

    return (
        <div className={styles.parent}>
            <h1
                className={
                    styles.title +
                    ' ' +
                    (props.isComplete ? styles.title_hidden : '')
                }
            >
                {props.title}
            </h1>
            {Object.keys(selectedAnime).length === 0 ? (
                <div className={styles.posterPre}>
                    <ul className={styles.posterPre__search}>
                        {animeLists.map((item) => {
                            return (
                                <>
                                    <li
                                        key={item.id}
                                        onClick={() => {
                                            callbacks.selectedAnime(item);
                                        }}
                                    >
                                        {item.russian}
                                    </li>
                                </>
                            );
                        })}
                    </ul>
                </div>
            ) : (
                <Poster
                    title={selectedAnime.title}
                    subtitle={selectedAnime.originalTitle}
                    image={`https://shikimori.one${selectedAnime.image}`}
                />
            )}

            <input
                className={
                    styles.input +
                    ' ' +
                    (props.isComplete ? styles.input_hidden : '')
                }
                placeholder='Введите сюда название'
                onChange={onInput}
            ></input>
        </div>
    );
}

SearchPosterContainer.defaultProps = {
    props: {
        title: '',
        position: 0,
        isComplete: false,
    },
};

export default React.memo(SearchPosterContainer);
