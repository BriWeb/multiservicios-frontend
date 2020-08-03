import React from 'react';

import Photo from '../Photo';   

class DeletePhoto extends React.Component {  //ESTE COMPONENTE NO LO ESTOY UTILIZANDO
    constructor(props){
        super(props);
        this.state = {
            gallery : this.props.gallery,
            preViews : []
        }
    }

    deleteOnePreView = (event) => {
        if(window.confirm('¡Cuidado!\nVas a eliminar esta foto, ¿estás seguro?')){

            const fileToDelete = event.target.src;
            let index = this.state.preViews.findIndex( item => fileToDelete === item.url);
            let auxPreViews = [...this.state.preViews];
            auxPreViews[index].style = {animation : "delete .4s ease-in"};

            this.setState({
                preViews : auxPreViews
            })

            setTimeout(() => {
                auxPreViews.splice(index, 1);
                this.setState({
                    preViews : auxPreViews
                })
            }, 390);
            this.deleteOnePhoto(fileToDelete); //WHAT IS THIS 
        }
    }

    render(){
        return(
            
            this.state.gallery.photos.map( (photo, index) => {
                return (
                    <Photo
                        key={index}
                        src={photo.url}
                        className={"gallery-form__img"}
                        style={photo.style}
                        alt={"vista previa de las fotos agregadas"}
                        handleClick={this.deleteOnePreView}
                    />
                )
            })
        )
    }
}

export default DeletePhoto;