import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import {useNavigate} from 'react-router-dom';


export default function Login() {
    const [islogin, setIslogin] = useState(true);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("virat@example.com");
    const [password, setPassword] = useState("Rushabh@1234");
    const [error , setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleLogin = async () => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
                email,
                password
            }, {
                withCredentials: true
            });

            if (res.data) {
                dispatch(addUser(res?.data?.user))
                navigate('/')
            }
        } catch (err) {
            setError(err?.response?.data?.message)
            console.error("Login failed:", err);
        }
    };

    const handleSignup = async () => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/signup`, {
                firstName,
                lastName,
                email,
                password
            }, {
                withCredentials: true
            });

            if (res.data) {
                dispatch(addUser(res?.data?.user))
                navigate('/profile')
            }
        } catch (err) {
            setError(err?.response?.data?.message)
            console.error("SignUp failed:", err);
        }
    };

    

    
  return (
    <div className='flex justify-center my-15 '>
        <div className="card bg-base-100 w-96 shadow-lg">
        <div className="card-body">
            <h2 className="card-title">{islogin ? "Login" : "SignUp"}</h2>
            <div className='flex flex-col gap-6'>
                {!islogin && 
                <><label className="input validator">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                        >
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                        </g>
                    </svg>
                    <input
                        type="text"
                        required
                        placeholder="Firstname"
                        value={firstName}
                        onChange={(e)=> setFirstName(e.target.value)}
                        title="Only letters"
                    />
                </label>
                <label className="input validator">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                        >
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                        </g>
                    </svg>
                    <input
                        type="text"
                        required
                        placeholder="Lastname"
                        value={lastName}
                        onChange={(e)=> setLastName(e.target.value)}
                        title="Only letters"
                    />
                </label></>
                }
                <label className="input validator">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                        >
                        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                        </g>
                    </svg>
                    <input 
                        type="email" 
                        value={email}  
                        placeholder="mail@site.com" 
                        required 
                        onChange={(e)=>setEmail(e.target.value)} 
                    />
                </label>

                <label className="input validator">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                        >
                        <path
                            d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                        ></path>
                        <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                        </g>
                    </svg>
                    <input
                        type="password"
                        value={password}
                        required
                        placeholder="Password"
                        minLength="6"
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                        title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                </label>
            </div>
            <p className="text-red-500">
                    {error}
                </p>
            <div className="card-actions flex flex-col justify-center items-center mt-2">
                <button className="btn btn-primary bg-neutral-700 " onClick={islogin? handleLogin : handleSignup}>{islogin ? "Login" : "SignUp"}</button>
                {islogin ? 
                    <p>Not  Registered? <span className='cursor-pointer font-bold' onClick={()=> setIslogin(false)}>SIGN UP</span></p> 
                    : <p>Already Registered? <span className='cursor-pointer font-bold' onClick={()=> setIslogin(true)}>LOG IN</span></p>}
            </div>
        </div>
    </div>
    </div>
  )
}
