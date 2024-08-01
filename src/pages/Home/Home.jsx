import React from 'react'
import { useAuth } from '../../context/AuthContext'
import NavBar from '../../components/NavBar'
import Maps from '../Maps/Index'

function Home() {
    const { user } = useAuth()
    console.log(user)




    return (
        <>
            <NavBar user={user}></NavBar>
            {/* <div className="w-full max-w-xs m-auto align-middle">
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <p className="text-xl mb-4">welcome {user.displayName || user.email}</p>
                </div>
            </div> */}
            <Maps></Maps>
        </>

    )
}

export default Home