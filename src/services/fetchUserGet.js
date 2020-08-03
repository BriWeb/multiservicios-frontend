import axios from 'axios';

import BASE_URL from '../config';

const fetchUserGet = async({username, password}) => {
    try {
        // const endpoint = `${BASE_URL}/api/login`;
        // function utf8_to_b64( name, password ) {
        //     return window.btoa(unescape(encodeURIComponent( `${name}:${password}` )));
        // }
        // const b64encoded = utf8_to_b64(name, password);
        // const {data} = await axios.post(endpoint, {}, {headers: {"authorization" : `Basic ${b64encoded}`} });

        const endpoint = `${BASE_URL}/api/login`;
        const {data} = await axios.post(endpoint, {}, {auth : {username, password} });
        
        if(data.auth){
            localStorage.setItem('Brian-token', data.token);
        }
        console.log("Token: ", data.message);
        return data.auth;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export default fetchUserGet;