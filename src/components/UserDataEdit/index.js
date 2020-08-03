import React, {useState, useEffect} from 'react';

import BASE_URL from '../../config';
import fetchGetSomedata from '../../services/fetchGetSomedata';
import fetchUserEditPhotos from '../../services/fetchUserEditPhotos';
import fetchUserEditContent from '../../services/fetchUserEditContent';

import UserAvatar from '../UserAvatar';
import Loading from '../Loading';


import './styles.css';

const UserDataEdit = () => {

    const [realInfo, setRealInfo] = useState({})
    const [info, setInfo] = useState({
        id : "",
        avatar : null,
        name : "",
        description : "",
        date: "",
        wallpaper : null
    })
    const [newAvatar, setNewAvatar] = useState(null);
    const [avatarPreView, setAvatarPreView] = useState("");
    const [newWallpaper, setNewWallpaper] = useState(null);
    const [wallpaperPreView, setWallpaperPreView] = useState("");
    const [messageUpdateOK, setMessageUpdateOK] = useState("");
    const [messageUpdateNOT, setMessageUpdateNOT] = useState("");
    const [loading, setLoading] = useState(false);


    useEffect( () => {
        findInfo();
    }, [])

    const findInfo = async () => {
        try {
            let endpoint = `${BASE_URL}/api/info/find`
            const data = await fetchGetSomedata(endpoint);
            const {_id, avatar, name, description, date, wallpaper} = data[0];
            setInfo({
                id : _id,
                avatar : avatar,
                name : name,
                description : description,
                date: date,
                wallpaper : wallpaper
            })
            setRealInfo({
                id : _id,
                avatar : avatar,
                name : name,
                description : description,
                date: date,
                wallpaper : wallpaper
            })
        } catch (error) {
            console.log(error);
        }
    }

    const handleInfoChange = (event) => {
        setInfo({
            ...info,
            [event.target.name] : event.target.value
        })
    }

    const photoChange = (event) => {
        const fileToAdd = event.target.files[0];
        if(fileToAdd){
            setNewAvatar(fileToAdd);
            setAvatarPreView(URL.createObjectURL(fileToAdd));
        }
    }

    const wallpaperChange = (event) => {
        const fileToAdd = event.target.files[0];
        if(fileToAdd){
            setWallpaperPreView(URL.createObjectURL(fileToAdd));
            setNewWallpaper(fileToAdd);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            let endpoint;
            setLoading(true);
            if(newAvatar){
                endpoint = `${BASE_URL}/api/info/photo/upd`;
                await fetchUserEditPhotos(endpoint, newAvatar)
            }

            if(newWallpaper){
                endpoint = `${BASE_URL}/api/info/wallpaper/upd`;
                await fetchUserEditPhotos(endpoint, newWallpaper)
            }

            const {id, name, description, date} = info;
            if(name !== realInfo.name || description !== realInfo.description || date !== realInfo.date){
                endpoint = `${BASE_URL}/api/info/content/upd`;
                await fetchUserEditContent({endpoint, id, name, description, date });
            }

            setLoading(false);
            setMessageUpdateOK("¡DATOS ACTUALIZADOS!");
            setMessageUpdateNOT("")

            findInfo();
        } catch (error) {
            console.log(error);
            setMessageUpdateOK("")
            setMessageUpdateNOT("¡ERROR AL CARGAR CIERTOS DATOS!")
        }
    }

    const renderAvatar = () => {
        if(avatarPreView.length === 0) {
            return <UserAvatar src={`${BASE_URL}${info.avatar}`}/>
        }else{
            return <UserAvatar src={`${avatarPreView}`}/>
        }
    }

    const renderWallpaper = () => {
        if(wallpaperPreView.length === 0) {
            return <div className="form-edit__wallpaper" style={{backgroundImage: `url('${BASE_URL}${info.wallpaper}')`}}></div>
        }else{
            return <div className="form-edit__wallpaper" style={{backgroundImage: `url('${wallpaperPreView}')`}}></div>
        }
    }

    const renderMessages = () => {
        if(messageUpdateOK !== ""){
            return <p className="form-edit__messageUpdateOK">{messageUpdateOK}</p>
        }else if(messageUpdateNOT !== ""){
            return <p className="form-edit__messageUpdateNOT">{messageUpdateNOT}</p>
        }
    }

    const renderLoading = () => {
        if(loading){
            return (<Loading/>)
        }
    }

    return(
        <form onSubmit={handleSubmit} className="form-edit">

            <section className="form-edit__avatar-container">
                <p className="form-edit__title">Foto de perfil</p>
                {renderAvatar()}
                <label htmlFor="photo"  className="form-edit__label">Click para seleccionar</label>
                <input type="file" id="photo" onChange={photoChange} className="form-edit__input"/>
            </section>

            <section className="form-edit__info-container">
                <div className="form-edit__name-container">
                    <p className="form-edit__title">Nombre</p>
                    <input className="form-edit__name" type="text" name="name" value={info.name} onChange={handleInfoChange}/>
                </div>
                <div className="form-edit__description-container">
                    <p className="form-edit__title">Descripción</p>
                    <input className="form-edit__description" type="text" name="description" value={info.description} onChange={handleInfoChange}/>
                </div>
                <div className="form-edit__date-container">
                    <p className="form-edit__title">Datos personales</p>
                    <textarea className="form-edit__date" name="date" value={info.date} onChange={handleInfoChange}/>
                </div>
            </section>

            <section className="form-edit__wallpaper-container">
                <p className="form-edit__title">Fondo de pantalla</p>
                {renderWallpaper()}
                <label htmlFor="wallpaper" className="form-edit__label">Click para seleccionar</label>
                <input type="file" id="wallpaper" onChange={wallpaperChange} className="form-edit__input"/>
            </section>

            {renderLoading()}
            {renderMessages()}
            <input type="submit" className="form-edit__button" value="Guardar datos"/>
        </form>
    )

}

export default UserDataEdit;