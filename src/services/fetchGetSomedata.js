import axios from 'axios';

const fetchGetSomedata = async (endpoint) => {
    try{
        const response = await axios.get(endpoint);
        if(response.status === 200){
            return response.data;
        }
    }catch(error){
        console.log(error);
    }
}

export default fetchGetSomedata;