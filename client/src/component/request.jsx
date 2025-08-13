import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addRequest, removeRequest } from '../utils/requestSlice';
import { RxCross2 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa6";


export default function Request() {
    const requests = useSelector((store)=>store.requests)
    const dispatch = useDispatch();
    const fetchRequest = async() =>{
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/request/received`,{
                withCredentials:true
            })
            dispatch(addRequest(res?.data?.data))
        } catch (error) {
            console.log(error);
        }
    }

    const receiveRequest = async(status, _id)=>{
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/request/review/${status}/${_id}`,{}, {
                withCredentials:true
            })
            dispatch(removeRequest(_id))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchRequest();
    },[]);

    if(!requests) return;
    if(requests.length === 0) return <h1>No Request Found</h1>
    console.log(requests)

  return (
    <div className='w-full h-full flex flex-col items-center gap-2 overflow-auto '>
        <h1 className='text-3xl font-bold text-neutral-500 mb-2'>Requests</h1>
        <ul className="list  rounded-box shadow-md w-3xl ">
            {requests.map((request)=>{
            const {fromUserId} = request
            return(
                <li className="list-row flex items-center bg-base-100 mt-2">
                <div>
                    <img className="size-10 rounded-box" 
                    src={fromUserId.photoUrl? fromUserId.photoUrl: "https://img.daisyui.com/images/profile/demo/1@94.webp"}
                    />
                </div>
                <div>
                    <h1 className='text-xl text-gray-700 font-bold'>{fromUserId.firstName + " " + fromUserId.lastName}</h1>
                    <div className="text-xs uppercase font-semibold opacity-60">{fromUserId.age + " " + fromUserId.gender}</div>
                    <p className="list-col-wrap text-xs">
                        {fromUserId.about}
                    </p>
                </div>
                <div className='mr-2 ml-auto flex gap-2'>
                    <button onClick={()=>receiveRequest("accepted", request._id)} className="btn text-2xl border-neutral-600 rounded-full btn-ghost">
                        <FaCheck/>
                    </button>
                <button onClick={()=>receiveRequest("rejected", request._id)} className="btn text-2xl border-neutral-600 rounded-full btn-ghost">
                    <RxCross2/>
                </button>
                </div>
            </li>
            )
        })}
        </ul>
    </div>
  )
}
