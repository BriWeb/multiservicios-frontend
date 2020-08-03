import React, {useState} from 'react';

import BASE_URL from '../../config';
import fetchGalleryDelete from '../../services/fetchGalleryDelete';

import GoBack from '../../components/GoBack';
import Loading from '../../components/Loading';

import './styles.css';

const GalleryRemove = () => {
    const [description, setDescription] = useState("");
    const [alert, setAlert] = useState("");
    const [loading, setLoading] = useState(false);


    const descriptionChange = (event) => {
        setDescription(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const confirmation = window.confirm('¡Cuidado!\nVas a eliminar esta galería, ¿estás seguro?');
        if(confirmation){
            try{
                setLoading(true);
                let endpoint = `${BASE_URL}/api/gallery/del/${description}`;
                const deleted = await fetchGalleryDelete(endpoint);
                if(deleted){
                    setAlert("Galería borrada con éxito");
                }else{
                    setAlert("Ha ocurrido un error");
                }
                setLoading(false);
                setDescription("");
            }catch(error){
                console.log(error)
            }
        }
    }

    const renderAlert = () => {
        if(alert.length > 0){
            if(alert === "Galería borrada con éxito"){
                return <p className="remove-alert-confirmed">{alert}</p>
            }else{
                return <p className="remove-alert-deneged">{alert}</p>
            }
        }
    }

    const renderLoading = () => {
        if(loading){
            return (<Loading/>)
        }
    }

    return(
        <div className="remove">
            <GoBack/>
            <p className="remove__title">Borrar</p>
            <form onSubmit={handleSubmit} className="form-remove">
                <label htmlFor="description" className="form-remove__textarea-label">Nombre de la galería</label>
                <input 
                    type="text"
                    className="form-remove__input"
                    required 
                    onChange={descriptionChange} 
                    name="description" 
                    value={description}
                    id="description"
                    autoComplete="off"
                />
                <button type="submit" className="form-remove__button">Borrar</button>
                {renderAlert()}
                {renderLoading()}
            </form>
        </div>
    )
}

export default GalleryRemove;