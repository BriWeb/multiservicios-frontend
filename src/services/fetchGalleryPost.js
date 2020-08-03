import axios from 'axios';

const fetchGalleryPost = async (endpoint, description, collaborators) => {
    try {
        const TOKEN = localStorage.getItem('Brian-token');
        const response = await axios.post(endpoint, {description, collaborators}, {headers:{'Authorization' : `Bearer ${TOKEN}`}})
        if(response.status === 201){
            return response.data;
        }
        return null;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export default fetchGalleryPost