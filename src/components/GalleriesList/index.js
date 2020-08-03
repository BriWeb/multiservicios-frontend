import React, {useState, useEffect} from 'react';

import BASE_URL from '../../config';
import fetchGetSomedata from '../../services/fetchGetSomedata';

import Gallery from '../Gallery';

import './styles.css';


const GalleriesList = () => {

    const [galleries, setGalleries] = useState([]);

    useEffect( () => {
        const findGalleries = async () => {
            try {
                const endpoint = `${BASE_URL}/api/gallery/findAll`;
                const data = await fetchGetSomedata(endpoint);
                if(data){
                    setGalleries(data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        findGalleries();
    }, []);
    
    return(
        <section id="Mis-trabajos" className="galleriesList" >
            {galleries.length > 0 && galleries.map( (gallery, index) =>
                <Gallery 
                    key={gallery._id}
                    description={gallery.description}
                    photos={gallery.photos}
                    collaborators={gallery.collaborators}
                    index={index}
                />
            )} 
        </section>
    )
}

export default GalleriesList;