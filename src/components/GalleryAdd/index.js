import React from 'react';

import GoBack from '../GoBack';
import Photo from '../Photo';
import Loading from '../Loading';

import './styles.css';

const GalleryAdd = ({description, collaborator, collaborators, photo, preViews, contPhotos, handleSubmit, descriptionChange, collaboratorChange, saveCollaborator, handleFileChange, deleteOnePreView, alertDescription, deleteCollaborator, loading}) => {

    const renderAlertDescription = () => {
        if(alertDescription){
            return <p className="insert-alert">Galería creada con éxito</p>
        }
    }

    const renderAlertCont = () => {
        if(contPhotos > 0){
            return <p className="insert-alert">Fotos agregadas con éxito: {contPhotos}</p>
        }
    }

    const renderCollaborators = () => {
        if(collaborators.length > 0){
            return (
                <div>
                    <p className="form-insert__collaborator-alert">(Para borrar haz click sobre el colaborador)</p>
                    {collaborators.map( (item, index) => 
                        (<p key={index} onClick={deleteCollaborator} className="form-insert__collaborators">{item}</p>)
                    )}
                </div>
            )
        }
    }

    const renderLoading = () => {
        if(loading){
            return <Loading/>
        }
    }

    return(
        <div className="insert">
            <GoBack/>
            <p className="insert__title">Agregar</p>
            <form onSubmit={handleSubmit} className="form-insert">
                <p className="form-insert__description-title">Ingresa la descripción</p>
                <input type="text" onChange={descriptionChange} className="form-insert__description" name="description" value={description} autoComplete="off" required/>
                <p className="form-insert__collaborator-title">Ingresa los colaboradores</p>
                <div className="form-insert__collaborator-container">
                    <input type="text" onChange={collaboratorChange} className="form-insert__collaborator-input" name="collaborator" autoComplete="off" value={collaborator}/>
                    <input type="button" value="Agregar" className="form-insert__collaborator-save" onClick={saveCollaborator}/>
                </div>
                {renderCollaborators()}
                <p className="form-insert__photography-title">Ingresa las fotografías</p>
                <div className="input-container">
                    <input type="file" id="image" value={photo} onChange={handleFileChange} className="form-insert__input"></input>
                    <label htmlFor="image" className="form-insert__label">Click aquí para seleccionar</label>
                </div>
                <div className="img-container">
                    {preViews.map((onePhoto, index) => 
                        <Photo 
                            key={index} 
                            src={onePhoto.url} 
                            className={"form__img"}
                            style={onePhoto.style}
                            alt={"vista previa de las fotos agregadas"}
                            handleClick={deleteOnePreView}
                        />
                    )}
                </div>
                <div className="button-container">
                    {renderLoading()}
                    {renderAlertDescription()}
                    {renderAlertCont()}
                    <button type="submit" className="form-insert__button">Subir</button>
                </div>
            </form>
        </div>
    )
}

export default GalleryAdd;