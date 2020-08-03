import React from 'react';

import Presentation from '../../components/Presentation';
import GalleriesList from '../../components/GalleriesList';
import ContactFormContainer from '../../components/ContactFormContainer';
import Navegation from '../../components/Navegation';

const Homepage = () => {
    return(
        <React.Fragment> 
            <Navegation/>
            <Presentation/>
            <GalleriesList/>
            <ContactFormContainer/>
        </React.Fragment>
    )
}

export default Homepage;