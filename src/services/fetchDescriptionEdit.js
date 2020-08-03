import axios from 'axios';

const fetchDescriptionEdit = async (endpoint, description) => {
    const TOKEN = localStorage.getItem("Brian-token");
    try {
        console.log("descripción ", description)
        await axios.put(endpoint, {description}, {headers:{'Authorization' : `Bearer ${TOKEN}`}})
    } catch (error) {
        console.log(error);
        return error;
    }
}

export default fetchDescriptionEdit;