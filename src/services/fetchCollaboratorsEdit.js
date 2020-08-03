import axios from 'axios';

const fetchCollaboratorsEdit = async (endpoint, collaborators) => {
    try {
        const TOKEN = localStorage.getItem('Brian-token');
        await axios.put(endpoint, {collaborators}, {headers:{'Authorization' : `Bearer ${TOKEN}`}}); //  /galleries/[add-del]collaborators/${idGallery}
    } catch (error) {
        console.log(error);
    }
}

export default fetchCollaboratorsEdit;