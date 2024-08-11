import React from 'react'
import { useAuth } from '../context/AuthContext'

export default function NavBar({ user }) {

    const { logout } = useAuth()

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.log(error.message

            )
        }
    }


    return (
        <div className="fixed navbar bg-base-100">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">Macrofitas</a>
            </div>
            <div className="flex-none gap-2">
                <div className="form-control">
                    <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                </div>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img alt="Tailwind CSS Navbar component" src={user.photoURL} />
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
