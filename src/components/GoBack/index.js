import React from 'react';
import {Link} from 'react-router-dom'

import Icon from '../Icon';

import './styles.css';

const GoBack = () => {

    return(
        <Link to={'/'} className="goBack">
            <Icon
                color="red"
                description="Inicio"
                fontIcon={<i className="fas fa-arrow-left"></i>}
            />
        </Link>
    )
}

export default GoBack;