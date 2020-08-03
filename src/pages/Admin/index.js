import React from 'react';

import GalleryEdit from '../../components/GalleryEdit';
import UserDataEdit from '../../components/UserDataEdit';
import GoBack from '../../components/GoBack';

import './styles.css';

const Admin = () => {

    return(
        <section className="admin">
            <GoBack/>
            <GalleryEdit/>
            <UserDataEdit/>
        </section>
    )
}

export default Admin;