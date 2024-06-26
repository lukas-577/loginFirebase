import React from 'react'
import { useAuth } from '../../context/AuthContext'
import NavBar from '../../components/NavBar'

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
        <>
            <NavBar></NavBar>
            <div className="w-full max-w-xs m-auto align-middle">
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <p className="text-xl mb-4">welcome {user.displayName || user.email}</p>
                    <button
                        className="btn base-300"
                        onClick={handleLogout}
                    >
                        logout
                    </button>
                </div>
            </div>
        </>

    )
}

export default Home