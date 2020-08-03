import React, {useState} from 'react';

import BASE_URL from '../../config';
import validateForm from './validateForm';
import fetchMessagePost from '../../services/fetchMessagePost';
import fetchPhotosAdd from '../../services/fetchPhotosAdd';

import ContacForm from '../ContactForm';

const ContactFormContainer = () => {
    
    const [info, setInfo] = useState({
        name: "",
        lastname: "",
        location: "",
        email: "",
        phone: "",
        message: "",
        // writedAt: ""
    });
    const [photo, setPhoto] = useState("");
    const [photos, setPhotos] = useState([]);
    const [preViews, setPreViews] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);

    // const BASE_URL = process.env.REACT_APP_BASE_URL;

    const handleChange = (event) => {
        setInfo({
            ...info, 
            [event.target.name] : event.target.value
        })
    }

    const handleFileChange = (event) => {
        let fileToAdd = event.target.files[0];
        if(fileToAdd){
            let preView = { 
                src : URL.createObjectURL(fileToAdd)
            };
            setPhoto("");
            setPhotos([...photos, fileToAdd]);
            setPreViews([...preViews, preView]);
        }
    }

    const deletePreview = (event) => {
        const fileToDelete = event.target.src;
        if(window.confirm('¿Eliminar esta foto?')){
            let aux = [...preViews];
            const index = aux.findIndex( preview => preview.src === fileToDelete);
            aux[index].style = {animation : "previewDelete .4s ease-in"};
            setPreViews(aux);
            setTimeout(() => {
                aux.splice(index, 1);
                setPhotos(photos.filter( photo => photo !== photos[index]));
                setPreViews(aux);
            },380)
        }
    }

    const handlesubmit = async (event) => {
        event.preventDefault();

        let faillMessage = validateForm(info, photos);

        if(faillMessage === "" ){
            setLoading(true);
            try {
                let endpoint = `${BASE_URL}/api/contactForm/add`;
                const data = await fetchMessagePost(endpoint, info);

                if(data){
                    const id = data;
                    if(photos.length > 0) {
                        let endpoint = `${BASE_URL}/api/contactForm/photo/add/${id}`;
                        await fetchPhotosAdd(endpoint, photos);
                    }
                    setInfo({
                        name : "",
                        lastname: "",
                        location: "",
                        email: "",
                        phone: "",
                        message: ""
                    })
                    setPhoto("");
                    setPhotos([]);
                    setPreViews([]);
                    setErrorMessage("");
                    setLoading(false);
                    setSuccessMessage("ENVIADO SATISFACTORIAMENTE, SE LE RESPONDERÁ A LA BREVEDAD");
                }

            } catch (error) {
                console.log(error);
            }
        }else{
            setErrorMessage(faillMessage)
        }
    }

    return(
        <ContacForm
            handlesubmit={handlesubmit}
            handleChange={handleChange}
            handleFileChange={handleFileChange} 
            info={info}
            photo={photo}
            preViews={preViews}
            deletePreview={deletePreview}
            errorMessage={errorMessage}
            successMessage={successMessage}
            loading={loading}
        />
    )
}

export default ContactFormContainer;