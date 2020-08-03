import React from 'react';

import './styles.css'

const UserData = ({date}) => {
    return (
        <div className="data" >
            <p className="data__paragraph" id="Sobre-Mi">{date}</p>
        </div>
    )
}

export default UserData;