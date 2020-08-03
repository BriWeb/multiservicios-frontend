import axios from 'axios';

const fetchMessagesSetReaded = async (endpoint) => {
    try {
        const TOKEN = localStorage.getItem("Brian-token");
        console.log("todo bien")
        const result = await axios.put(endpoint, {}, {headers:{'Authorization' : `Bearer ${TOKEN}`}}); 
        if(result.status === 201){
            return result
        }
    } catch (error) {
        console.log(error);
    }
}

export default fetchMessagesSetReaded;