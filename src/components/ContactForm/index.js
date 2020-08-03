import React from 'react';

import Loading from '../Loading';
import Icon from '../Icon';

import './styles.css';

const ContactForm = ({handlesubmit, handleChange, handleFileChange, info, photo, preViews, deletePreview, errorMessage, successMessage, loading}) => {

    const renderPreviews = () => {
        if(preViews.length > 0){
            return (
            <div className="contact-form__previews-container">
                {preViews.map( (preView, index) => 
                    <img 
                        src={preView.src} 
                        key={index} 
                        alt="foto subida por el cliente" 
                        className="contact-form__preview"
                        style={preView.style}
                        onClick={deletePreview}
                    />)}
            </div>)
        }
    }

    const renderError = () => {
        if(errorMessage !== ""){
            return <p className="contact-form__error-message">{errorMessage}</p>
        }
    }

    const renderSuccess = () => {
        if(successMessage.length > 0){
            return <p className="contact-form__success-message">{successMessage}</p>
        }
    }

    const renderLoading = () => {
        if(loading){
            return (<Loading/>)
        }
    }

    return(
        <section id="Formulario-de-contacto" className="contact-container" >
            <form className="contact-form" onSubmit={handlesubmit}>
                <Icon 
                    fontIcon={<i className="fas fa-user-alt"></i>}
                    color={"#2c3e50"}
                />
                <fieldset className="contact-form__fieldset contact-form__names">
                    <legend className="contact-form__legend">Nombres</legend>
                    <div className="contact-form__firstname contact-form__flex">
                        <Icon 
                            fontIcon={<i className="far fa-address-card"></i>}
                            color={"#686de0"}   
                        />
                        <input 
                            className="contact-form__input"
                            type="text" 
                            name="name" 
                            value={info.name}
                            placeholder="Tu nombre.." 
                            onChange={handleChange}
                            autoComplete="off"
                            maxLength="30" 
                            minLength="2"
                            required
                        />
                    </div>
                    <div className="contact-form__lastname contact-form__flex">
                        <Icon
                            fontIcon={<i className="far fa-address-card"></i>}
                            color={"#686de0"}
                        />
                        <input 
                            className="contact-form__input"
                            type="text" 
                            name="lastname" 
                            value={info.lastname}
                            placeholder="Tu apellido.." 
                            onChange={handleChange} 
                            autoComplete="off" 
                            maxLength="30" 
                            minLength="2"
                            required
                        />
                    </div>
                </fieldset>

                <fieldset className="contact-form__fieldset">
                    <legend className="contact-form__legend">Localización</legend>
                    <div className="contact-form__location contact-form__flex">
                        <Icon
                            fontIcon={<i className="fas fa-map-marker-alt"></i>}
                            color={"#eb4d4b"}
                        />
                        <input 
                            className="contact-form__input"
                            type="text" 
                            name="location" 
                            value={info.location}
                            placeholder="Tu localidad.." 
                            onChange={handleChange} 
                            autoComplete="off" 
                            maxLength="30" 
                            minLength="2"
                            required
                        />
                    </div>
                </fieldset>

                <fieldset className="contact-form__fieldset contact-form__contac">
                    <legend className="contact-form__legend">Contacto</legend>
                    <div className="contact-form__email contact-form__flex">
                        <Icon
                            fontIcon={<i className="fas fa-envelope-open-text"></i>}
                            color={"#2c3e50"}
                        />
                        <input 
                            className="contact-form__input"
                            type="email" 
                            name="email" 
                            value={info.email}
                            placeholder="Tu email.." 
                            onChange={handleChange} 
                            maxLength="70"
                            required
                        />
                    </div>
                    <div className="contact-form__phone contact-form__flex">
                        <Icon
                            fontIcon={<i className="fas fa-mobile-alt"></i>}
                            color={"black"}
                        />
                        <input 
                            className="contact-form__input"
                            type="tel" 
                            name="phone" 
                            value={info.phone}
                            placeholder="Tu teléfono.." 
                            onChange={handleChange} 
                            autoComplete="off"
                            maxLength="25"
                            minLength="4"
                            required
                        />
                    </div>
                </fieldset>

                <fieldset className="contact-form__fieldset">
                    <legend className="contact-form__legend">Fotografías</legend>
                    <label htmlFor="photo" className="contact-form__label-file">Click para seleccionar fotos</label>
                    <input 
                        className="contact-form__input-file" 
                        type="file"
                        id="photo" 
                        name="photo" 
                        value={photo}
                        onChange={handleFileChange} 
                    />
                    {renderPreviews()}
                </fieldset>
                <fieldset className="contact-form__fieldset">
                    <legend className="contact-form__legend">Mensaje</legend>
                    <div className="contact-form__message contact-form__flex">
                        <Icon
                            fontIcon={<i className="far fa-edit"></i>}
                            color={"#27ae60"}
                        />
                        <label htmlFor="message" className="contact-form__label-textarea">Detalles del trabajo a realizar</label>
                    </div>
                    <textarea 
                        className="contact-form__textarea"
                        name="message" 
                        value={info.message}
                        onChange={handleChange} 
                        autoComplete="off" 
                        placeholder="Escribe tu mensaje.."
                        maxLength="3000"
                        minLength="50"
                        required
                    />
                </fieldset>
                {renderLoading()}
                {renderError()}
                {renderSuccess()}
                <input className="contact-form__submit" type="submit" value="Enviar"/>
            </form>
        </section>
    )
}

export default ContactForm;