import React, {useState} from 'react';

import fetchUserGet from '../../services/fetchUserGet';

import './styles.css';

const LoginWindow = ({login, style}) => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    })
    const [errorMessage, setErrorMessage] = useState("");

    
    const handleChange = (event) => {
        setCredentials({
            ...credentials,
            [event.target.name] : event.target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // const {username, password} = credentials;
            // const isUserValidate = await fetchUserGet(username, password);
            const isUserValidate = await fetchUserGet(credentials);
            if(isUserValidate){
                setCredentials({
                    username: "",
                    password: ""
                })
                setErrorMessage("");
                login();
            }else{
                setErrorMessage("Usuario inválido");
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <form className="login-form" onSubmit={handleSubmit} autoComplete="off" style={style}>
            <p className="login-form__paragraph">¿Quién eres?</p>
            <p className="error">{errorMessage}</p>
            <div className="login-form__fields">
                <label htmlFor="username" className="login-form__label">Nombre: </label>
                <input 
                    type="text" 
                    className="login-form__input"
                    value={credentials.username} 
                    name="username" 
                    id="username" 
                    onChange={handleChange}
                    required
                ></input>
            </div>

            <div className="login-form__fields">
                <label htmlFor="password" className="login-form__label">Contraseña: </label>
                <input 
                    type="password" 
                    onChange={handleChange} 
                    required 
                    name="password" 
                    id="password" 
                    className="login-form__input"
                    value={credentials.password}
                ></input>
            </div>
            <div className="login-form__fields">
                <button type="submit" className="login-form__button">Ingresar</button>
            </div>
        </form>
    )
}

export default LoginWindow;