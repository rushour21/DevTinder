import axios from 'axios';
import React from 'react'
import { useDispatch } from 'react-redux';
import { removeFeed } from '../utils/feedSlice';

export default function UserCard({user , isoff}) {
    if (!user) return null; // prevent error on first render
    const dispatch = useDispatch();
    const {_id, firstName, lastName, photoUrl, age, gender, about} = user;
    
    const handleSendRequest = async (status, userId) =>{
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/request/send/${status}/${userId}`,
                {},
                {withCredentials:true}
            );
            dispatch(removeFeed(userId));
        } catch (error) {
            console.log(error);
        }
    }
    return (
    <div className="card bg-base-100 w-96 shadow-sm relative">
        <figure className='h-ful'>
            <img
            src={photoUrl}
            alt="uuig"
            className="w-full h-full" />
        </figure>
        <div className="card-body absolute bottom-0 text-neutral-50 w-full">
            <h2 className="card-title">{firstName + " " + lastName}</h2>
            <p>{age && gender &&`${age} ${gender.charAt(0).toUpperCase() + gender.slice(1)}`}</p>
            <p className=' whitespace-normal break-words w-full'>{about? about :''}</p>
            <div className="card-actions justify-end w-full">
                <button /*disabled={isoff}*/ onClick={()=>handleSendRequest('ignored', _id)} className="btn btn-primary">Ignore</button>
                <button /*disabled={isoff}*/ onClick={()=>handleSendRequest('interested', _id)} className="btn btn-primary">Interested</button>
            </div>
        </div>
    </div>
  )
}
