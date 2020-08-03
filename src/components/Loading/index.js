import React from 'react';

import './styles.css';

const Loading = ({small}) => {

    const loadingContainerClassName = small ? "loading-container-small" : "loading-container-normal";
    const loadingClassName = small ? "loading-small" : "loading-normal";

    return (
        <div className={loadingContainerClassName}>
            <i className={`fas fa-spinner ${loadingClassName}`} ></i>
        </div>
    )
}

export default Loading;