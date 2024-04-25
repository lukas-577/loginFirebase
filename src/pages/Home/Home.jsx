import React from 'react'
import { useAuth } from '../../context/authContext'

function Home() {
    const { user, logout, loading } = useAuth()
    console.log(user)
    const navegate = useNavigate()

    const handleLogout = async ()=>{
        await logout()
        
    }

    if(loading == true) {
        return <h1>bienvenido {user.email}</h1>
    }

    return (
        <div><h1 className='btn'>home</h1>
            

            <button onClick={handleLogout}>Logaut</button>
        </div>
    )
}

export default Home