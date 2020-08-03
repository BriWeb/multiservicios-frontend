import React from 'react';

import './styles.css';

const Icon = ({handleClick, color, description, fontIcon}) => {
    return(
        <div className="icon" onClick={handleClick}>
            <div className="icon__img" style={{color : color}}>
                {fontIcon}
            </div>
            {description ? <p className="icon__paragraph">{description}</p> : ''}
        </div>
    )
}

export default Icon;