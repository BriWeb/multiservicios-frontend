import React, {useState} from 'react';

import BASE_URL from '../../config';
import fetchGalleryPost from '../../services/fetchGalleryPost';
import fetchPhotosAdd from '../../services/fetchPhotosAdd';

import GalleryAdd from '../../components/GalleryAdd';

const GalleryAddContainer = (props) => {
    const [photo, setPhoto] = useState("");
    const [filesToAdd, setFilesToAdd] = useState([]);
    const [preViews, setPreViews] = useState([]);
    const [description, setDescription] = useState("");
    const [alertDescription, setAlertDescription] = useState(false);
    const [contPhotos, setContPhotos] = useState(0);
    const [collaborators, setCollaborators] = useState([]);
    const [collaborator, setCollaborator] = useState("");
    const [loading, setLoading] = useState(false);


    const collaboratorChange = (event) => {
        setCollaborator(event.target.value)
    }
    
    const descriptionChange = (event) => {
        setDescription(event.target.value)
    }


    const handleFileChange = (event) => {
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

    const deleteOnePreView = (event) => {
        if(window.confirm('¡Cuidado!\nVas a eliminar esta foto, ¿estás seguro?')){
            const fileToDelete = event.target.src;
            let index = preViews.findIndex( item => fileToDelete === item.url);

            let aux = [];
            preViews.forEach( item => {
                aux.push(JSON.parse(JSON.stringify(item)))
            })

            aux[index].style = {animation : "delete .4s ease-in"};
            setPreViews(aux);

            setTimeout(() => {
                aux.splice(index, 1);
                setPreViews(aux);
                setFilesToAdd(filesToAdd.filter( item => item !== filesToAdd[index]))
            }, 400);

        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(preViews.length === 0) {
            alert('Seleccioná qué fotos vas a subir')
        }else if(description.length === 0){
            alert('Ponle una descripción')
        }else{
            setLoading(true);
            let endpoint;
            try {
                endpoint = `${BASE_URL}/api/gallery/add`;
                const idGallery = await fetchGalleryPost(endpoint, description, collaborators);  // CREA GALERÍA CON DESCRIPCIÓN Y COLABORADORES

                if(idGallery){
                    setAlertDescription(true);
                    endpoint = `${BASE_URL}/api/gallery/photo/add/${idGallery}`;
                    const photosUpload = await fetchPhotosAdd(endpoint, filesToAdd); // SUBE LAS FOTOS
                    setContPhotos(photosUpload);
                }

                setFilesToAdd([]);
                setPreViews([]);
                setDescription("");
                setContPhotos(0);
                setCollaborators([]);
                setCollaborator("");
                setLoading(false);
            }catch (error) {
                console.log(error);
            }
        }
    } 

    const saveCollaborator = () => {
        if(collaborator.length > 0){
            setCollaborators([...collaborators, collaborator])
            setCollaborator("")
        }
    }

    const deleteCollaborator = (event) => {
        if(window.confirm('¿Eliminar este colaborador?')){
            setCollaborators(collaborators.filter( item => item !== event.target.textContent));
        }
    }

    return(
        <GalleryAdd
            description={description}
            collaborator={collaborator}
            collaborators={collaborators}
            photo={photo}
            preViews={preViews}
            contPhotos={contPhotos}
            handleSubmit={handleSubmit}
            descriptionChange={descriptionChange}
            collaboratorChange={collaboratorChange}
            saveCollaborator={saveCollaborator}
            handleFileChange={handleFileChange}
            deleteOnePreView={deleteOnePreView}
            alertDescription={alertDescription}
            deleteCollaborator={deleteCollaborator}
            loading={loading}
        />
    )
}

export default GalleryAddContainer