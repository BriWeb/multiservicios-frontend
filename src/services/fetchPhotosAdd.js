import axios from 'axios';

const fetchPhotosAdd = async (endpoint, photos) => {
    const TOKEN = localStorage.getItem("Brian-token");
    try {
        let photosUpload = 0;
        photos.forEach(async photo => {
            let formData = new FormData();
            formData.append('photo', photo);
            await axios.put(endpoint, formData, {headers:{'Authorization' : `Bearer ${TOKEN}`}});
            photosUpload ++;
        })
        return photosUpload
    } catch (error) {
        console.log(error);
        return 0;
    }
}

export default fetchPhotosAdd;