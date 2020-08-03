import axios from 'axios';

const fetchGalleryDelete = async (endpoint) => {
    const TOKEN = localStorage.getItem('Brian-token');
    try {
        let deleted = false;
        const response = await axios.delete(endpoint, {headers:{'Authorization' : `Bearer ${TOKEN}`}});
        if(response.status === 200 && response.data.deletedCount > 0){
            deleted = true;
        }
        return deleted;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export default fetchGalleryDelete;