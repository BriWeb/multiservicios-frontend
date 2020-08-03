import axios from 'axios';

const fetchPhotosDelete = async (endpoint, filesToDelete) => {
    const TOKEN = localStorage.getItem("Brian-token");
    try {
        await axios.put(endpoint, {filesToDelete}, {headers:{'Authorization' : `Bearer ${TOKEN}`}});
    } catch (error) {
        console.log(error)
    }
}

export default fetchPhotosDelete;