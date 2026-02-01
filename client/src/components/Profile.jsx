import React from 'react'
import EditProfile from './editProfile'
import { useSelector } from 'react-redux'

export default function Profle() {
  const user = useSelector((store) => store.user)
  return (
    <div className='container mx-auto p-4 flex justify-center py-12'>
      {user && <EditProfile user={user} />}
    </div>
  )
}
