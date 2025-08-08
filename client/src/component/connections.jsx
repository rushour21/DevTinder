import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionsSlice';


export default function Connections() {
    const connections = useSelector((store)=>store.connections)
    const dispatch = useDispatch();


    const fetchconnections= async ()=>{
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/connections`, {
                withCredentials:true
            });
            
            dispatch((addConnections(res?.data?.data)))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchconnections();
    },[])

    if(!connections) return;
    if(connections.length === 0) return <h1>No connections Found</h1>

  return (
    <div className='w-full h-full flex flex-col items-center gap-2 overflow-auto '>
        <h1 className='text-3xl font-bold text-neutral-500 mb-2'>Connections</h1>
        <ul className="list bg-base-100 rounded-box shadow-md w-3xl">
            {connections.map((connection)=>{
            const {firstName, lastName, photoUrl, age, gender, about} = connection
            return(
                <li className="list-row flex items-center">
                <div>
                    <img className="size-10 rounded-box" 
                    src={photoUrl? photoUrl: "https://img.daisyui.com/images/profile/demo/1@94.webp"}
                    />
                </div>
                <div>
                    <h1 className='text-xl text-gray-700 font-bold'>{firstName + " " + lastName}</h1>
                    <div className="text-xs uppercase font-semibold opacity-60">{age + " " + gender}</div>
                    <p className="list-col-wrap text-xs">
                        {about}
                    </p>
                </div>
            </li>
            )
        })}
        </ul>
    </div>
  )
}

            