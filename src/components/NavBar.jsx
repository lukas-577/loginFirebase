import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import ImgProfile from './ImgProfile'
import ThemeController from './Theme'

export default function NavBar({ user }) {

    const { logout } = useAuth()
    const navegate = useNavigate()

    const handleLogout = async () => {
        try {
            await logout();
            navegate("/login")
        } catch (error) {
            console.log(error.message

            )
        }
    }


    return (
        <div className="fixed top-0 w-full navbar bg-primary text-white shadow-md z-10">
            <div className="flex-1">
                <div className="w-10 rounded-full">
                    <img src="/junco.png" alt="Icap" />
                </div>
                <a className="btn btn-ghost text-xl" href='/'>Icap</a>
            </div>
            <div className="flex-none gap-4">
                <div className="">
                    <ThemeController></ThemeController>
                </div>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <ImgProfile user={user} />
                        </div>
                    </div>
                    <box-icon name='chevron-down'></box-icon>
                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-primary rounded-box w-52">
                        <li>
                            <a href='/profile' className="justify-between">
                                Perfil
                            </a>
                        </li>
                        <li><button onClick={handleLogout}>Cerrar Sesión</button></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
