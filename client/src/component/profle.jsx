import React from 'react'
import EditProfile  from './editProfile'
import { useSelector } from 'react-redux'
import UserCard from './userCard';

export default function Profle() {
  const user = useSelector((store) => store.user)
  console.log(user);
  return (
    <div className='flex gap-8 p-4 justify-center flex-wrap'>
      {user && <EditProfile user={user}/>} 
      {user && <UserCard user={user}/>}
    </div>
  )
}
