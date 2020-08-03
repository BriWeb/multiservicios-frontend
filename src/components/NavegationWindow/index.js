import React from 'react';

import './styles.css';

const NavegationWindow = ({style, openCloseNavetation}) => {
    return(
        <div className="menu" style={style}>
            <ul className="menu__ul">
                <li className="menu__li"><a href="#Mi-perfil" onClick={openCloseNavetation}>Mi perfil</a></li>
                <li className="menu__li"><a href="#Mis-trabajos" onClick={openCloseNavetation}>Mis trabajos</a></li>
                <li className="menu__li"><a href="#Formulario-de-contacto" onClick={openCloseNavetation}>Deja tu consulta</a></li>
            </ul>
        </div>
    )
}

export default NavegationWindow;