import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import icon from '../assets/icon.jpg'
import {Link, useNavigate} from 'react-router-dom';
import { removeUser } from '../utils/userSlice';
import axios from 'axios';



export default function Navbar() {
    const user = useSelector((store)=> store.user);
    const dispatch =  useDispatch();
    const navigate = useNavigate();

    const handleLogout = async ()=>{
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/logout`,{}, {withCredentials:true})
            dispatch(removeUser());
            return navigate('/login');
        } catch (error) {
            console.log(error)
        }
    }
    
  return (
    <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
            <Link to='/' className="btn btn-ghost text-xl text-[#cf742a] ">〽️DevTinder</Link>
        </div>
        <div className="flex items-center gap-6">
            {user && <p>welcome {user?.firstName} {user?.lastName}</p>}
            <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                        <img
                            alt="Tailwind CSS Navbar component"
                            src={user ? user.photoUrl : icon }/>
                    </div>
                </div>
                {user && <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                    <li>
                    <Link to='/profile' className="justify-between">
                        Profile
                        <span className="badge">New</span>
                    </Link>
                    </li>
                    <li><Link to='connections'>Connections</Link></li>
                    <li><a onClick={handleLogout}>Logout</a></li>
                </ul>}
            </div>
        </div>
    </div>
  )
}
