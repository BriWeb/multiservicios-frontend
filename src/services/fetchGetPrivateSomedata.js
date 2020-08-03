import axios from 'axios';

const fetchGetPrivateSomedata = async (endpoint) => {
    try{
        const TOKEN = localStorage.getItem("Brian-token");
        const response = await axios.get(endpoint, {headers:{'Authorization' : `Bearer ${TOKEN}`}});
        if(response.status === 200){
            return response.data;
        }
        return false;
    }catch(error){
        console.log(error);
        return false;
    }
}

export default fetchGetPrivateSomedata;