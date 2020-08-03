import React from 'react';
import './styles.css';

const Photo = ({src, className, alt, handleClick, style}) => {

    return(
        <img 
            src={src} 
            className={className}
            alt={alt}
            onClick={handleClick}
            style={style}
        ></img>
    )
}

export default Photo;