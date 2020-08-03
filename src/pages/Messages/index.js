import React, {useState, useEffect} from 'react';

import BASE_URL from '../../config';
import fetchGetPrivateSomedata from '../../services/fetchGetPrivateSomedata';
import fetchMessagesSetReaded from '../../services/fetchMessagesSetReaded';
import fetchMessageDelete from '../../services/fetchMessageDelete';

import GoBack from '../../components/GoBack';
import Message from '../../components/Message';

import './styles.css';

const Messages = (/*{findUnreadMessages}*/) => {
    const [messages, setMessages] = useState([]);
    
    useEffect( () => {
        findAll();
    }, [])

    const findAll = async() => {
        try {
            let enpoint = `${BASE_URL}/api/contactForm/findAll`;
            const data = await fetchGetPrivateSomedata(enpoint);
            setMessages(data)
        } catch (error) {
            console.log(error);
        }
    }
    
    const readedMessage = async(id) => {
        try {
            let endpoint = `${BASE_URL}/api/contactForm/read/upd/${id}`;
            await fetchMessagesSetReaded(endpoint);
            const index = messages.findIndex( message => message._id === id);
            const auxMessages = [];
            messages.forEach( message => {
                if(typeof message === "object"){
                    auxMessages.push(JSON.parse(JSON.stringify(message)))
                }else{
                    auxMessages.push(message);
                }
            })
            auxMessages[index].read = !auxMessages[index].read;
            setMessages(auxMessages);

            // findUnreadMessages();
        } catch (error) {
            console.log(error);
        }
    }

    const deleteMessage = async(id) => {
        if(window.confirm('¿Borrar?')){
            try {
                let endpoint = `${BASE_URL}/api/contactForm/del/${id}`;
                await fetchMessageDelete(endpoint);
                await findAll();
            } catch (error) {
                console.log(error);
            }
        }
           
    }

    const renderMessages = () => {
        if(messages.length > 0){
            return (
                <React.Fragment>
                    {messages.map((message, index) => {
                    return(
                        <Message key={index} message={message} deleteMessage={deleteMessage} readedMessage={readedMessage} />
                    )
                    })}
                </React.Fragment>
            )
        }
    }
    
    return(
        <React.Fragment>
            <GoBack/>
            <div className="messages-container">{renderMessages()}</div>
        </React.Fragment>
    )
}

export default Messages;