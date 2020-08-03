import React, {useState, useEffect} from 'react';

import BASE_URL from '../../config';
import fetchGetSomedata from '../../services/fetchGetSomedata';

import UserData from '../UserData';
import UserAvatar from '../UserAvatar';


import './styles.css';

const Presentation = () => {

    const [info, setInfo] = useState({
        id: "",
        avatar: "",
        name: "",
        description: "",
        date: "",
        wallpaper: ""
    });

    // const BASE_URL = process.env.REACT_APP_BASE_URL;

    useEffect( () => {
        const getInfo = async () => {
            try {
                const endpoint = `${BASE_URL}/api/info/find`;
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
            } catch (error) {
                console.log(error);
            }
        }
        getInfo();
    }, [])

    if(info.wallpaper){
        return(
            <section id="Mi-perfil" className="presentation-container" style={{backgroundImage: `url('${BASE_URL}${info.wallpaper}')`}}>
                <div className="info">
                    {info.avatar ? <UserAvatar src={`${BASE_URL}${info.avatar}`}/> : ''}
                    <div className="info__date">
                        <h1 className="info__name">{info.name}</h1>
                        <h2 className="info__description">{info.description}</h2>
                    </div> 
                </div>
                <UserData date={info.date}/>
            </section>
        )
    }else{
        return(
            <section id="Mi-perfil" className="presentation-container">
                <div className="info">
                    {info.avatar ? <UserAvatar src={`${BASE_URL}${info.avatar}`}/> : ''}
                    <div className="info__date">
                        <h1 className="info__name">{info.name}</h1>
                        <h2 className="info__description">{info.description}</h2>
                    </div> 
                </div>
                <UserData date={info.date}/>
            </section>
        )

    }
}

export default Presentation;