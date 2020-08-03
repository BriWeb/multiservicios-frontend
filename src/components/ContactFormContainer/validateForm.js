const validateForm = (info, photos) => {
    const {name, lastname, location, email, phone, message} = info;

    let faillMessage = "";

    const regExEmail = /^[A-Za-z0-9._-]{1,40}@[A-Za-z0-9._-]{1,17}\.[a-zA-Z]{1,13}$/; //expresión regular simple para validar email
    const regExNames = /^[a-zA-Z ]{2,30}$/;
    const regExPhone = /^[0-9]{4,25}$/;
    const regExMessage = /^.{50,3000}$/

    if(!regExNames.test(name)){
        faillMessage = 'Escribe el nombre sin símbolos, y que contenga entre 2 y 30 caracteres';
    }else if(!regExNames.test(lastname)){
        faillMessage = 'Escribe el apellido sin símbolos, y que contenga entre 2 y 30 caracteres';
    }else if(!regExNames.test(location)){
        faillMessage = 'Escribe la localidad sin símbolos, y que contenga entre 2 y 30 caracteres';
    }else if(!regExEmail.test(email)){ 
        faillMessage = 'El correo sólo puede contener letras, números, guiones, guiones bajos y puntos, y un máximo de 70 caracteres';
    }else if(!regExPhone.test(phone)){
        faillMessage = 'El teléfono sólo debe contener números y no debe ser mayor a 25 caracteres';
    }else if(photos.length === 0){
        faillMessage = 'Inserta al menos una foto';
    }else if(photos.length > 10){
        faillMessage = 'No puedes superar las 10 fotografías';
    }else if(!regExMessage.test(message)){
        faillMessage = 'El mensaje debe contener entre 50 y 3000 caracteres';
    }

    return faillMessage;
}

export default validateForm;