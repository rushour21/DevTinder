import React from 'react'
import EditProfile  from './editProfile'
import { useSelector } from 'react-redux'
import UserCard from './userCard';

export default function Profle() {
  const user = useSelector((store) => store.user)
  return (
    <div className='flex gap-8 p-4'>
      {user && <EditProfile user={user}/>} 
    </div>
  )
}
