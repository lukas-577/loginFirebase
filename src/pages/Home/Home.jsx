import React from 'react'
import { useAuth } from '../../context/AuthContext'

function Home() {
    const { user, logout } = useAuth()
    console.log(user)

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.log(error.message)
        }

    }


    return (
        <><h1>bienvenido {user.email}</h1>
            <div>
                <h1 className='btn'>home</h1>


                <button onClick={handleLogout}>Logaut</button>
            </div>
        </>
    )
}

export default Home