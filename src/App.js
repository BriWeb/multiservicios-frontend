import React, {useState, useEffect} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import fetchValidateUser from './services/fetchValidateUser';
import fetchGetUnreadMessages from './services/fetchGetUnreadMessages';
import BASE_URL from './config';

import Login from './components/Login';
import GalleryAddContainer from './pages/GalleryAddContainer';
import Admin from './pages/Admin';
import GalleryRemove from './pages/GalleryRemove';
import Messages from './pages/Messages';
import NotFound from './pages/NotFound';
import Homepage from './pages/Homepage';


const App = () => {

    const [isLogged, setIsLogged] = useState(false);
    const [unreadMessages, setUnreadMessages] = useState(0);

    useEffect(() => {
        let TOKEN = localStorage.getItem('Brian-token');
        const validate = async () => {
            if(TOKEN){
                try {
                    const {auth, message} = await fetchValidateUser();
                    if(auth){
                        setIsLogged(true);
                        await findUnreadMessages();
                    }else if(localStorage.getItem("Brian-token")){
                        localStorage.removeItem("Brian-token")
                    }
                    console.log(message)
                } catch (error) {
                    console.log(error);
                }
            }
        }
        validate();
    }, [isLogged])

    const findUnreadMessages = async () => {
        try {
            const endpoint = `${BASE_URL}/api/contactForm/findAll/readeds`;
            const quantity = await fetchGetUnreadMessages(endpoint);
            setUnreadMessages(quantity)
        } catch (error) {
            console.log(error)
        }
    }

    
    return(
        <BrowserRouter>
            <Login isLogged={isLogged} setIsLogged={setIsLogged} unreadMessages={unreadMessages} setUnreadMessages={setUnreadMessages}/>
            <Switch>
                <Route path="/" exact component={Homepage}/>
                <PrivateRoute path="/Agregar" isLogged={isLogged} component={GalleryAddContainer}/>
                <PrivateRoute path="/Borrar" isLogged={isLogged} component={GalleryRemove}/>
                <PrivateRoute path="/Administrar" isLogged={isLogged} component={Admin}/>
                <PrivateRoute path="/Mensajes" isLogged={isLogged} component={() => <Messages /*findUnreadMessages={findUnreadMessages}*//>}/>
                <Route component={NotFound}/>
            </Switch>
        </BrowserRouter>
    )
}

export default App;