import React, { useState, useContext } from 'react';
import styles from './styles.module.scss';

function Poster(props) {
    return (
        <div className={styles.poster} style={{backgroundImage: `linear-gradient(179.95deg, rgba(18, 18, 18, 0) 0.04%, #0E0E0E 99.96%), url(${props.image})`}}>
            <h1>{props.title}</h1>
            <h2>{props.subtitle}</h2>
        </div>
    );
}

Poster.defaultProps = {
    props: {
        title: "",
        subtitle: "",
        image: "",
    },
};

export default React.memo(Poster);
