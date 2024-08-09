import React from 'react';
import NavBar from '../../components/NavBar'
import { useAuth } from '../../context/AuthContext'
import Camera from '../Camera/components/Camera';

function CameraPage() {
    const { user } = useAuth()
    console.log(user)

    return (
        <>
            <div className='z-50 fixed w-full bg-base-100'>
                <NavBar user={user}></NavBar>
            </div>

            <div>
                <h1>Usa tu Camara</h1>
                <Camera />
            </div>
        </>
    );
}

export default CameraPage;