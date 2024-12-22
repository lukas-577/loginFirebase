import React from 'react'
import { useAuth } from '../../context/AuthContext'
import NavBar from '../../components/NavBar'
import Maps from '../Maps/Index'
import { useNavigate } from 'react-router-dom'
import 'boxicons';

function Home() {
    const { user } = useAuth()
    console.log(user)

    const navigate = useNavigate();

    const handleCameraClick = () => {
        navigate('/camera');
    }

    return (
        <>
            <div className='z-50 fixed w-full bg-base-100'>
                <NavBar user={user}></NavBar>
            </div>

            <div className="w-full z-0">
                <Maps></Maps>
            </div>

            <div className="fixed bottom-0 right-0 m-5">
                <button
                    onClick={handleCameraClick}
                    className="btn btn-success"
                >
                    <box-icon name='camera' animation='tada' animation-duration='' ></box-icon>Usa la Camara
                </button>
            </div>
        </>

    )
}

export default Home