import React, { useState } from 'react'
import UserCard from './userCard'

export default function editProfile({user}) {
    const [firstName , setFirstName] = useState(user.firstName)
    const [lastName , setLastName] = useState(user.lastName)
    const [photoUrl , setPhotoUrl] = useState(user.photoUrl)
    const [age , setAge] = useState(user.age)
    const [gender , setGender] = useState(user.gender)
    const [about , setAbout] = useState(user.about)

  return (
     <div className='flex gap-6 mr-auto ml-auto'>
        <div className="card bg-base-100 w-96 shadow-lg">
            <div className="card-body">
                <h2 className="card-title">Login</h2>
                <div className='flex flex-col gap-2'>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">First Name</legend>
                        <input type="text" value={firstName} onChange={(e)=> setFirstName(e.target.value)} className="input" placeholder="Type here" />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Last Name</legend>
                        <input type="text" value={lastName} onChange={(e)=> setLastName(e.target.value)} className="input" placeholder="Type here" />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Photo URL</legend>
                        <input type="text" value={photoUrl} onChange={(e)=> setLastName(e.target.value)} className="input" placeholder="Type here" />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Age</legend>
                        <input type="number" value={age} onChange={(e)=> setAge(e.target.value)} className="input" placeholder="Type here" />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Gender</legend>
                        <input type="text" value={gender} onChange={(e)=> setGender(e.target.value)} className="input" placeholder="Type here" />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">About</legend>
                        <input type="text" value={about} onChange={(e)=> setAbout(e.target.value)} className="input" placeholder="Type here" />
                    </fieldset>
                </div>
                <div className="card-actions justify-center mt-2">
                    <button className="btn btn-primary bg-neutral-700 ">Update</button>
                </div>
            </div>
        </div>
        <UserCard user={{firstName, lastName, photoUrl, age, gender, about} }/>
    </div>
  )
}
