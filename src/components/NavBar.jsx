import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

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
                <a className="btn btn-ghost text-xl" href='/'>Icap</a>
            </div>
            <div className="flex-none gap-4">
                <div className="">
                    <a className="btn btn-ghost text-xl" href='/'>Home</a>
                </div>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img alt="Tailwind CSS" src={user.photoURL} />
                        </div>
                    </div>
                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                        <li>
                            <a href='/profile' className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li><button onClick={handleLogout}>Logout</button></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
