import React, {useState} from 'react';

import Modal from '../Modal';

import './styles.css';

const UserAvatar = ({src}) => {
    const [avatarExpand, setAvatarExpand] = useState("");

    const openCloseModal = (event) => {
        if(avatarExpand.length > 0){
            setAvatarExpand(""); //CLOSE MODAL
        }else{
            setAvatarExpand([event.target.src]) //OPEN MODAL
        }
    }

    const renderAvatarExpand = () => {
        if(avatarExpand.length > 0){
            return (
                <Modal 
                    photoSelected={avatarExpand} 
                    className="presentation-container__avatar" 
                    closeModal={openCloseModal}
                    styleModal={{borderRadius: '50%'}}
                />
            )
        }
    }

    return(
        <>
            <img 
                className="avatar-img" 
                alt="foto de perfil del propietario" 
                src={src} 
                onClick={openCloseModal}
            />
            {renderAvatarExpand()}
        </>
    )
}

export default UserAvatar;