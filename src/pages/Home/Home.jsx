import React from 'react'
import { useAuth } from '../../context/authContext'

function Home() {
    const { user } = useAuth()
    console.log(user)

    return (
        <div><h1 className='btn'>home</h1></div>
    )
}

export default Home