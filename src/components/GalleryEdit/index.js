import React, {useState} from 'react';

import BASE_URL from '../../config';
import fetchGetPrivateSomedata from '../../services/fetchGetPrivateSomedata';
import fetchPhotosDelete from '../../services/fetchPhotosDelete';
import fetchCollaboratorsEdit from '../../services/fetchCollaboratorsEdit';
import fetchPhotosAdd from '../../services/fetchPhotosAdd';
import fetchDescriptionEdit from '../../services/fetchDescriptionEdit';

import Photo from '../Photo';
import Loading from '../Loading';

import './styles.css';


const GalleryEdit = () => {

    const [description, setDescription] = useState("");
    const [info, setInfo] = useState({
        description: "",
        collaborator: "",
    })
    const [photo, setPhoto] = useState("");
    const [filesToAdd, setFilesToAdd] = useState([])
    const [filesToDelete, setFilesToDelete] = useState([]);
    const [preViews, setPreViews] = useState([]);
    const [serverPreViews, setServerPreViews] = useState([]);
    const [gallery, setGallery] = useState(null);
    const [alertFind, setAlertFind] = useState("");
    const [collaboratorsToAdd, setCollaboratorsToAdd] = useState([]);
    const [collaboratorsToDelete, setCollaboratorsToDelete] = useState([]);
    const [loading, setLoading] = useState(false);


    const descriptionChange = (event) => {
        setDescription(event.target.value)
    }
    
    const findGallery = async (event) => { //BUSCAR LA GALERÍA SELECCIONADA
        event.preventDefault();
        setLoading(true);
        try {
            let endpoint = `${BASE_URL}/api/gallery/findOne/${description}`;
            const data = await fetchGetPrivateSomedata(endpoint);
            if(data){
                let photos = [];

                data.photos.forEach( item => {
                        let photo = {
                            url : `${BASE_URL}${item}` //Imágenes que vienen del servidor, con nombre "/uploads/name.ext"
                        }
                        photos = [...photos, photo];
                    })
    
                setInfo({
                    ...info,
                    description : data.description
                })
                setDescription("")
                setGallery(data)
                setServerPreViews(photos);
                setAlertFind("");
            }else{
                setAlertFind("Galería no encontrada");
            }
            setLoading(false);

        } catch (error) {
            console.log(error);
        }
    }

    const infoChange = (event) => {
        setInfo({
            ...info,
            [event.target.name] : event.target.value
        })
    }


    const handleFileChange = async (event) => {
        const fileToAdd = event.target.files[0];
        if(fileToAdd){
            let preView = {
                url : URL.createObjectURL(fileToAdd)
            }
            setPhoto("");
            setPreViews([...preViews, preView]);
            setFilesToAdd([...filesToAdd, fileToAdd]);
        }
    }


    const deleteOneServerPreView = (event) => {
        if(window.confirm('¡Cuidado!\nVas a eliminar esta foto, ¿estás seguro?')){
            const src = event.target.src;  //ejemplo : http://localhost:5000/uploads/1593387405102.jpg                        

            let auxServerPreViews = [];
            serverPreViews.forEach( item => {
                auxServerPreViews.push(JSON.parse(JSON.stringify(item)))
            })
            let index = auxServerPreViews.findIndex( item => item.url === src );
            auxServerPreViews[index].style = {animation : "delete .4s ease-in"};

            const fileToDelete = src.slice(BASE_URL.length);  //le quito http://localhost:5000 quedando /uploads/1593387405102.jpg

            setServerPreViews(auxServerPreViews);
            setFilesToDelete([...filesToDelete, fileToDelete])

            setTimeout(() => {
                setServerPreViews(serverPreViews.filter( (item, i) => i !== index))
            }, 390);
        }
    }

    const deleteOnePreView = (event) => {
        if(window.confirm('¡Cuidado!\nVas a eliminar esta foto, ¿estás seguro?')){
            const fileToDelete = event.target.src; //ejemplo : blob:http://localhost:5000/c128431b-5f36-4ddf-b464-4dbcd986cc5d
            let index = preViews.findIndex( item => fileToDelete === item.url);


            let auxPreViews = [];
            preViews.forEach( item => {
                auxPreViews.push(JSON.parse(JSON.stringify(item)))
            })
            auxPreViews[index].style = {animation : "delete .4s ease-in"};


            let auxFilesToAdd = [];
            filesToAdd.forEach( item => {
                auxFilesToAdd.push(JSON.parse(JSON.stringify(item)))
            })
            auxFilesToAdd.splice(index, 1);


            setPreViews(auxPreViews);
            setFilesToAdd(auxFilesToAdd);

            setTimeout(() => {
                setPreViews(preViews.filter( (item, i) => i !== index))
            }, 390);

        }
    }

    
    const saveCollaborator = () => {
        if(info.collaborator.length > 0){
            setCollaboratorsToAdd([...collaboratorsToAdd, info.collaborator])
            setInfo({
                ...info,
                collaborator: ""
            })
        }
    }

    const deleteCollaborator = (event) => {
        if(window.confirm('¿Eliminar este colaborador?')){

            const toDelete = event.target.textContent;
            const index = gallery.collaborators.indexOf(toDelete);

            if(index === -1){
                setCollaboratorsToAdd(collaboratorsToAdd.filter( item => item !== toDelete))
            }else{
                let galleryAux = JSON.parse(JSON.stringify(gallery));
                galleryAux.collaborators.splice(index, 1);    
                setGallery(galleryAux);
                setCollaboratorsToDelete([...collaboratorsToDelete, toDelete])           
            }
        }
    }

    const submitGallery = async (event) => { 
        event.preventDefault();
        setLoading(true);
        let endpoint;
        try{
            const id = gallery._id;
            
            if(filesToDelete.length > 0){ //BORRAR FOTOS
                console.log("fotos borradas");
                endpoint = `${BASE_URL}/api/gallery/photo/del/${id}`;
                await fetchPhotosDelete(endpoint, filesToDelete);
            }
            
            
            if(filesToAdd.length > 0){  //AGREGAR LAS NUEVAS FOTOS
                console.log("fotos agregadas");
                endpoint = `${BASE_URL}/api/gallery/photo/add/${id}`;
                await fetchPhotosAdd(endpoint, filesToAdd);
            }

           
            if(collaboratorsToAdd.length > 0){   //AGREGAR LOS NUEVOS COLABORADORES
                console.log("colaboradores agregados");
                endpoint = `${BASE_URL}/api/gallery/collaborators/add/${id}`;
                await fetchCollaboratorsEdit(endpoint, collaboratorsToAdd);
            }

            
            if(collaboratorsToDelete.length > 0){  //BORRAR COLABORADORES
                console.log("colaboradores borrados");
                endpoint = `${BASE_URL}/api/gallery/collaborators/del/${id}`;
                await fetchCollaboratorsEdit(endpoint, collaboratorsToDelete);
            }

            
            if(info.description !== gallery.description){ //EDITAR DESCRIPCIÓN
                console.log("descripción actualizada");
                endpoint = `${BASE_URL}/api/gallery/description/upd/${id}`;
                await fetchDescriptionEdit(endpoint, info.description);
            }


            setPreViews([]);
            setServerPreViews([]);
            setFilesToAdd([]);
            setFilesToDelete([]);
            setInfo({
                description: "",
                collaborator: ""
            })
            setCollaboratorsToAdd([]);
            setCollaboratorsToDelete([]);
            setLoading(false);
            setGallery(null);
        }catch(error){
            console.log(error);
        }
    }

    const renderLoading = () => {
        if(loading){
            return (<Loading/>)
        }
    }

    const renderCollaborators = () => {
        if(gallery.collaborators.length > 0 || collaboratorsToAdd.length > 0){
            return (
                <>
                    <p className="form-insert__collaborator-alert">(Para borrar haz click sobre el colaborador)</p>
                    {gallery.collaborators.map( (oneCollaborator, index) => 
                        (<p key={index} onClick={deleteCollaborator} className="gallery-edit__collaborators">{oneCollaborator}</p>)
                    )}
                    {collaboratorsToAdd.map( (oneCollaborator, index) => 
                        (<p key={index} onClick={deleteCollaborator} className="gallery-edit__collaborators">{oneCollaborator}</p>)
                    )}
                </>
            )
        }
    }

    const showAlert = () => {
        if(alertFind.length > 0){
            return <p className="edit-galleries-alert">{alertFind}</p>
        }
    }

    const showGallery = () => {
        if(gallery){
            return (
                <div className="gallery-edit">
                    <p className="gallery-edit__title">Editar Galería</p>
                    <form onSubmit={submitGallery} className="gallery-edit__form">
                        <label htmlFor="textarea" className="gallery-edit__description-title">Descripción</label>
                        <input type="text" id="textarea" onChange={infoChange} className="gallery-edit__input-description" name="description" value={info.description} required></input>
                        <p className="gallery-edit__collaborator-title">Edita los colaboradores</p>
                        <div className="gallery-edit__collaborator-container">
                            <input type="text" onChange={infoChange} className="gallery-edit__collaborator-input" name="collaborator" value={info.collaborator}/>
                            <input type="button" value="Agregar" className="gallery-edit__collaborator-save" onClick={saveCollaborator}/>
                        </div>
                        {renderCollaborators()}
                        <p className="gallery-edit__photography-title">Edita las fotografías</p>
                        <div className="input-container">
                            <input type="file" id="image" value={photo} onChange={handleFileChange} className="gallery-edit__input"></input>
                            <label htmlFor="image" className="gallery-edit__label">Click aquí para seleccionar</label>
                        </div>
                        <div className="img-container">
                            {serverPreViews.map((photo, index) => 
                                <Photo 
                                    key={index} 
                                    src={photo.url} 
                                    className={"form__img"}
                                    style={photo.style}
                                    alt={"vista previa de las fotos del servidor"}
                                    handleClick={deleteOneServerPreView}
                                />
                            )}
                            {preViews.map((photo, index) => 
                                <Photo 
                                    key={index} 
                                    src={photo.url} 
                                    className={"form__img"}
                                    style={photo.style}
                                    alt={"vista previa de las fotos agregadas"}
                                    handleClick={deleteOnePreView}
                                />
                            )}
                        </div>
                        <div className="button-container">
                            <button type="submit" className="gallery-edit__button">Guardar</button>
                        </div>
                    </form>
                </div>
            )
        }
    }


    return(
        <section className="gallery-edit-container">
            <form onSubmit={findGallery} className="gallery-edit-container__form">
                <p className="gallery-edit-container__title">Editar</p>
                <input 
                    className="gallery-edit-container__input"
                    type="text" 
                    name="description" 
                    id="description" 
                    value={description}
                    onChange={descriptionChange} 
                    required 
                    placeholder="Escribe la descripción..."
                />
                {showAlert()}
                {renderLoading()}
                <button type="submit" className="gallery-edit-container__submit">Buscar</button>
            </form>
            {showGallery()}
        </section>
    )
}

export default GalleryEdit;