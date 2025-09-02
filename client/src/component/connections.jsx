import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionsSlice';
import { IoChatboxEllipses } from "react-icons/io5";
import { Link } from 'react-router-dom';


export default function Connections() {
    const connections = useSelector((store)=>store.connections)
    const dispatch = useDispatch();
    console.log(connections);

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
        <ul className="list rounded-box shadow-md w-3xl">
            {connections.map((connection)=>{
            const {_id, firstName, lastName, photoUrl, age, gender, about} = connection
            return(
                <li key={_id} className="list-row bg-base-100 mt-2 flex justify-between">
                    <div className='flex items-center gap-3'>
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
                    </div>
                    <Link to={`/chat/${_id}`}>
                        <button className='cursor-pointer'><IoChatboxEllipses size={35} color='grey'/></button>
                    </Link>
                </li>
            )
        })}
        </ul>
    </div>
  )
}

            