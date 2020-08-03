import React from 'react';
import {Link} from 'react-router-dom'

import Icon from '../Icon';

import './styles.css';

const Buttons = ({isLogged, logout, unreadMessages, openCloseLogin}) => {

    if(isLogged){
        return (
            <div className="container-icons">
                <Icon
                    fontIcon={<i className="fas fa-sign-out-alt"></i>}
                    handleClick={logout}
                    description={"Salir"}
                    color={"ecf0f1"}
                />
                
                <Link to={'/Administrar'}>
                    <Icon 
                        fontIcon={<i className="fas fa-cogs"></i>}
                        description={"Editar"}
                        color={"#27ae60"}
                    />
                </Link>
            
                <Link to={'/Agregar'}>
                    <Icon 
                        fontIcon={<i className="fas fa-folder-plus"></i>}
                        description={"Agregar"}
                        color={"#e1b12c"}
                    />
                </Link>

                <Link to={'/Borrar'}>
                    <Icon 
                        fontIcon={<i className="fas fa-trash-alt"></i>}
                        description={"Borrar"}
                        color={"#c0392b"}
                    />
                </Link>

                <Link to={'/Mensajes'}>
                    <Icon 
                        fontIcon={<i className="fas fa-comment-dots"></i>}
                        description={`( ${unreadMessages} )`}
                        color={"#2980b9"}
                    />
                </Link>
                
            </div>
        )
    }else{
        return (
        <div className="container-icons">
            <Icon 
                fontIcon={<i className="fas fa-sign-in-alt"></i>}
                handleClick={openCloseLogin}
                description={""}
                color={"#ecf0f1"}
            />                
        </div>
        )
    }
}

export default Buttons;