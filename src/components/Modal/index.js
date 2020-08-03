import React from 'react';

import './styles.css';

const Modal = ({photoSelected, styleModal, closeModal}) => {
    return(
        <div className="modal-container">
            <div className="modal">
                <img className="modal__photo" src={photoSelected} style={styleModal} alt="foto seleccionada"></img>
            </div>
            <div className="close-modal" onClick={closeModal}>X</div>
        </div>
    )
        
}

export default Modal;