import React from 'react'
import { Service } from '../../services/context';

function ServicesProvider(props) {

    return (
        <Service.Provider value={props.service}>
            {props.children}
        </Service.Provider>
    )
}

ServicesProvider.defaultProps = {
    service: null,
    children: <></>,
}

export default ServicesProvider;