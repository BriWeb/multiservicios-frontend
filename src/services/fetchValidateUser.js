import axios from 'axios';
import url from '../config';

const fetchValidateUser = async () => {
    const TOKEN = localStorage.getItem('Brian-token');
    try {
        const {data} = await axios.get(`${url}/api/whoami`, {headers:{'Authorization' : `Bearer ${TOKEN}`}});
        return {auth : data.auth, message : data.message}
    } catch (error) {
        return {auth : false, message : "falsified token"}
    }
}

export default fetchValidateUser;