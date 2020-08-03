import React, {useState} from 'react';

import NavegationWindow from '../NavegationWindow';
import Icon from '../Icon';

import './styles.css';

const Navegation = () => {

    const [navegationWindow, setNavegationWindow] = useState(false);
    const [styleNavegation, setStyleNavegation] = useState({ animation : ""});

    const openCloseNavetation = () => {
        if(navegationWindow){
            setStyleNavegation({animation: 'menuDisappear .4s'})
            setTimeout( () => {
                setNavegationWindow(false);
            }, 390)
        }else{
            setStyleNavegation({animation: 'menuAppear .4s'});
            setNavegationWindow(true);
        }
    }

    const renderNavegation = () => {
        if(navegationWindow){
            return <NavegationWindow style={styleNavegation} openCloseNavetation={openCloseNavetation}/>
        }
    }

    return(
        <> 
            <div className="open-close-navegation">
                <Icon
                    fontIcon={<i className="fas fa-th-large"></i>}
                    description={"Menu"}
                    color={"#ecf0f1"}
                    handleClick={openCloseNavetation}
                />
            </div>
            {renderNavegation()}
        </>
    )
}

export default Navegation;