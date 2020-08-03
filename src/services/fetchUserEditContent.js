import axios from 'axios';

const fetchUserEditContent = async({endpoint, id, name, description, date}) => {
    try {
        const TOKEN = localStorage.getItem("Brian-token");
        const datos = {
            id,
            name,
            description,
            date
        }
        await axios.put(endpoint, {datos}, {headers:{'Authorization' : `Bearer ${TOKEN}`}});
    } catch (error) {
        
    }
}

export default fetchUserEditContent;