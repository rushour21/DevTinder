import React from 'react'

export default function UserCard({user}) {
    const {firstName, lastName, photoUrl, age, gender, about} = user;
  return (
    <div className="card bg-base-100 h-h-[75%] w-96 shadow-sm relative">
        <figure className='h-ful'>
            <img
            src={user.photoUrl}
            alt={`${firstName} ${lastName}`}
            className="w-full h-full" />
        </figure>
        <div className="card-body absolute bottom-0 text-gray-400 w-full">
            <h2 className="card-title">{firstName + " " + lastName}</h2>
            <p>{`${age} ${gender.charAt(0).toUpperCase() + gender.slice(1)}`}</p>
            <p>{about}</p>
            <div className="card-actions justify-end w-full">
                <button className="btn btn-primary">Ignore</button>
                <button className="btn btn-primary">Interested</button>
            </div>
        </div>
    </div>
  )
}
