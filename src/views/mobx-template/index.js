import React, { useContext, useCallback } from 'react';
import styles from './styles.module.scss';
import { Service } from '../../services/context';

import { observer } from 'mobx-react-lite';

function MobxTemplate() {
    const service = useContext(Service);

    const callbacks = {
        increment: useCallback(() => {
            service.globalStore.increment();
        }),
        decrement: useCallback(() => {
            service.globalStore.decrement();
        }),
        reset: useCallback(() => {
            service.globalStore.reset();
        }),
    };

    return (
        <>
            <div className={styles.container}>
                <h1>{service.globalStore.getCount()}</h1>
                <div>
                    <button onClick={callbacks.decrement}>-1</button>
                    <button onClick={callbacks.increment}>+1</button>
                </div>
                <button onClick={callbacks.reset}>Обнулить</button>
            </div>
        </>
    );
}

export default observer(MobxTemplate);
