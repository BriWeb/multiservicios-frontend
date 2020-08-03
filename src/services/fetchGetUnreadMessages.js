import axios from 'axios';

const fetchGetUnreadMessages = async (endpoint) => {
    const TOKEN = localStorage.getItem('Brian-token');
    try {
        const response = await axios.get(endpoint, {headers:{'Authorization' : `Bearer ${TOKEN}`}});
        let unreadMessages = 0;
        if(response.status === 200){
            response.data.forEach( message => {
                if(!message.read){
                    unreadMessages++;
                }
            })
        }
        return unreadMessages
    } catch (error) {
        console.log(error);
        return 0
    }
}

export default fetchGetUnreadMessages;