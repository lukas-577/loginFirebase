import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePhoto } from '../../context/PhotoContext';
import Camera from '../Camera/components/Camera';
import { useAuth } from '../../context/AuthContext'
import NavBar from '../../components/NavBar';

function CameraPage() {
    const { user } = useAuth()
    

    const { setPhoto } = usePhoto();
    console.log(setPhoto); 
    const navigate = useNavigate();

    const handleCapture = (imageSrc) => {
        setPhoto(imageSrc);
        navigate('/review-photo'); 
    };

    return (
        <>
            {user && (
                <div className='z-50 fixed w-full bg-base-100'>
                    <NavBar user={user}></NavBar>
                </div>
            )}
    
            <div>
                <h1>Usa tu Cámara</h1>
                <Camera onCapture={handleCapture} />
            </div>
        </>
    );
}

export default CameraPage;