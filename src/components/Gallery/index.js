import React, {useState} from 'react'

import BASE_URL from '../../config';

import Photo from '../Photo';
import Modal from '../Modal';

import './styles.css'

const Gallery = ({photos, collaborators, description, index}) => {

    const [photoSelected, setPhotoSelected] = useState(null);
    const [photoTarget, setPhotoTarget] = useState(BASE_URL + photos[0]);
    const [style, setStyle] = useState({animation: ''});

    // this.BASE_URL = process.env.REACT_APP_BASE_URL;

    const handlePhotoTarget = (event) => {
        setPhotoTarget(event.target.src);
        setStyle({animation : 'appear .6s'})
        setTimeout( () => {
            setStyle({
                animation : ''
            })
        }, 600)
    }

    const openModal = (event) => {
        setPhotoSelected(event.target.src)
    }

    const closeModal = (event) => {
        setPhotoSelected(null);
    }

    const renderModal = () => {
        if(photoSelected){
            return <Modal photoSelected={photoSelected} closeModal={closeModal}/>  
        }              
    }

    const renderCollaborators = () => {
        if(collaborators.length > 0){
            return (
                <div> 
                    <p className="gallery__collaborator">Con la colaboración de: </p>
                    {collaborators.map( (collaborator, i) => 
                        <a key={i} className="gallery__link" href={collaborator} target="_blank" rel="noopener noreferrer">{collaborator}</a>
                    )} 
                </div>
            )
        }
    }

    return(
        <div className="gallery">
            <h3 className="gallery__description">{description}</h3>
            {renderCollaborators()}
            <div className={`gallery__visualization ${index%2 === 0 ? '' : 'row-reverse'}`}>
                <img 
                    src={photoTarget} 
                    onClick={openModal} 
                    className="gallery__photo-target" 
                    alt={`Fotografía de la galería ${description}`} 
                    style={style}
                />
                <div className="gallery__photos">
                    {photos.map( (photo, index) =>
                        <Photo 
                            key={index}
                            src={`${BASE_URL}${photo}`}
                            className={"gallery__photo"}
                            alt={`Fotografía de la galería ${description}`}
                            handleClick={handlePhotoTarget}
                        />
                    )}
                </div>
            </div>
            {renderModal()}
        </div>
    )
}

export default Gallery;