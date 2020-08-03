import axios from 'axios';

const fetchUserPost = async (endpoint, info) => {
    try {
        const response = await axios.post(endpoint, info);
        if(response.status === 200){
            return response.data
        }
        return null
    } catch (error) {
        console.log(error);
        return null
    }
}

export default fetchUserPost;