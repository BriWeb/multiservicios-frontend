import axios from 'axios';

const fetchMessageDelete = async (endpoint) => {
    try {
        const TOKEN = localStorage.getItem("Brian-token");
        await axios.delete(endpoint, {headers:{'Authorization' : `Bearer ${TOKEN}`}}); 
    } catch (error) {
        console.log(error);
    }
}

export default fetchMessageDelete;