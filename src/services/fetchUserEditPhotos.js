import axios from 'axios';

const fetchUserEditPhotos = async (endpoint, photo) => {
    try {
        const TOKEN = localStorage.getItem("Brian-token");
        const formData = new FormData();
        formData.append("photo", photo);
        await axios.put(endpoint, formData, {headers:{'Authorization' : `Bearer ${TOKEN}`}})
    } catch (error) {
        console.log(error);
    }
}

export default fetchUserEditPhotos;