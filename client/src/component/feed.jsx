import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice';
import axios from 'axios';
import UserCard from './userCard';


export default function Feed() {
    const feed = useSelector((store)=> store.feed)
    const dispatch =  useDispatch();

    const getFeed= async ()=>{
        if(feed) return;
        try {
            const res =  await axios.get(`${import.meta.env.VITE_API_URL}/feed`,{withCredentials:true})
            dispatch(addFeed(res?.data))
            //console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getFeed();
    }, [])
    console.log(feed)

  return (
    <div className='flex flex-1 justify-center items-center mt-auto mb-auto'>
        {feed && feed.length > 0 ? <UserCard user={feed[0]}/> : <p className='text-3xl'>No User Found</p>}
    </div>
  )
}
