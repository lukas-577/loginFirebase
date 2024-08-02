import React from 'react'
import { useAuth } from '../../context/AuthContext'
import NavBar from '../../components/NavBar'
import Maps from '../Maps/Index'

function Home() {
    const { user } = useAuth()
    console.log(user)




    return (
        <>
            <div className='z-50 fixed w-full bg-base-100'>
                <NavBar user={user}></NavBar>
            </div>

            <div className="w-full z-0">
                <Maps></Maps>
            </div>

        </>

    )
}

export default Home