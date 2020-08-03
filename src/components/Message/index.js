import React, {useState} from 'react';

import BASE_URL from '../../config';
import calculatedTime from './calculatedTime';

import Photo from '../Photo';
import Modal from '../Modal';

import './styles.css';

const Message = ({message, deleteMessage, readedMessage}) => {
    const [photoSelected, setPhotoSelected] = useState(null);


    const setPhoto = (event) => {
        setPhotoSelected(event.target.src)
    }

    const openModal = () => {
        if(photoSelected){
            return <Modal photoSelected={photoSelected} closeModal={closeModal}/>  
        }              
    }

    const closeModal = () => {
        setPhotoSelected(null)
    }

    const renderPhotos = () => {
        if(message.photos.length > 0){
            return (
                <div className="message__photos">
                    {message.photos.map( (photo, index) => {
                        return <Photo key={index} src={BASE_URL + photo} className="message__photo" handleClick={setPhoto} alt={`Foto del usuario ${message.name}`}/>
                    })}
                </div>
            )
        }
    }


    const {writedAt} = message;
    const {hour, minute, day, date, month, year} = calculatedTime(writedAt);


    return(
        <div className="message">
            <div className="message__fields">
                <p>De: <span className="message__names">{message.name} {message.lastname} </span> </p>
                <p>Hora: <span className="message__time">{hour}:{minute}</span></p>
            </div>
            <div className="message__fields">
                <p>Fecha: <span className="message__date">{`${day}, ${date} de ${month} del ${year}`}</span></p>
                <p>Localidad: <span className="message__location">{message.location}</span></p>
            </div>
            <div className="message__fields">
                <p>Teléfono: <span className="message__phone">{message.phone}</span> </p>
                <p>Email: <span className="message__email">{message.email}</span></p>
            </div>
            <div className="message__message">
                <p style={{textDecorationLine: 'underline'}}>Mensaje:</p>
                <p className="message__text">{message.message}</p>
            </div>
            {renderPhotos()}
            <div className="message__buttons">
                <div className="message__read">
                    <label className="message__label" htmlFor="readed">Marcar como <span>leído</span></label>
                    <input className="message__checkbox" type="checkbox" checked={message.read} id="readed" onChange={ () => readedMessage(message._id)}/>
                </div>
                <button className="message__btn-delete" onClick={() => deleteMessage(message._id)}>Borrar</button>
            </div>
            {openModal()}
        </div>
    )
}

export default Message;