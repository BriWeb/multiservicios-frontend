import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';

import Buttons from '../Buttons';
import LoginWindow from '../LoginWindow';

const Login = ({isLogged, setIsLogged, unreadMessages}) => {
    const [loginWindow, setLoginWindow] = useState(false);
    const [styleLogin, setStyleLogin] = useState({ animation : ""});

    let history = useHistory();

    const openCloseLogin = () => {
        if(loginWindow){
            setStyleLogin({animation: "loginDisappear .4s"});
            setTimeout(() => {
                setLoginWindow(false);
            }, 380)
        }else{
            setStyleLogin({animation: "loginAppear .4s"});
            setLoginWindow(true);
        }
    }

    const logout =  () => {
        localStorage.removeItem('Brian-token');
        setIsLogged(false);
        history.push('/')
    }

    const renderLogin = () => {
        if(loginWindow){
            return <LoginWindow login={login} style={styleLogin}/>
        }
    }

    const login = () => {
        setIsLogged(true);
        setStyleLogin({animation: "loginDisappear .4s"});
        setTimeout(() => {
            setLoginWindow(false);
        }, 380)
    }
    
    return(
        <React.Fragment>
            {renderLogin()}
            <Buttons isLogged={isLogged} unreadMessages={unreadMessages} logout={logout} openCloseLogin={openCloseLogin}/>
        </React.Fragment>
    )
}

export default Login;