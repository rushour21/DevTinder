import React, { useState } from 'react'
import UserCard from './userCard'
import axios from 'axios'

export default function EditProfile({ user }) {
  const [firstName, setFirstName] = useState(user.firstName)
  const [lastName, setLastName] = useState(user.lastName)
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl)
  const [age, setAge] = useState(user.age)
  const [gender, setGender] = useState(user.gender)
  const [about, setAbout] = useState(user.about)
  const [toast, setToast] = useState(null) // success or error message

  const handleSubmit = async () => {
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/profile/update`,
        {
          firstName,
          lastName,
          age,
          gender,
          photoUrl,
          about,
        },
        {
          withCredentials: true,
        }
      )

      if (res.status === 200) {
        setToast({ type: 'success', message: 'Profile updated successfully' })
      }
    } catch (error) {
      setToast({ type: 'error', message: 'Failed to update profile ' })
      console.log(error)
    } finally {
      // Auto-hide toast after 3s
      setTimeout(() => setToast(null), 2000)
    }
  }

  return (
    <div className="flex gap-6 mr-auto ml-auto">
      {/* ✅ Conditional Toast */}
      {toast && (
        <div className="toast toast-top toast-center z-10">
          <div
            className={`alert ${
              toast.type === 'success' ? 'alert-success' : 'alert-error'
            }`}
          >
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      <div className="card bg-base-100 w-96 shadow-lg">
        <div className="card-body">
          <h2 className="card-title">Edit Profile</h2>
          <div className="flex flex-col gap-2">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">First Name</legend>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="input"
                placeholder="Type here"
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Last Name</legend>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="input"
                placeholder="Type here"
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Photo URL</legend>
              <input
                type="text"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                className="input"
                placeholder="Type here"
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Age</legend>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="input"
                placeholder="Type here"
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Gender</legend>
              <input
                type="text"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="input"
                placeholder="Type here"
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">About</legend>
              <input
                type="text"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="input"
                placeholder="Type here"
              />
            </fieldset>
          </div>
          <div className="card-actions justify-center mt-2">
            <button
              className="btn btn-primary bg-neutral-700"
              onClick={handleSubmit}
            >
              Update
            </button>
          </div>
        </div>
      </div>

      <UserCard
        user={{ firstName, lastName, photoUrl, age, gender, about }}
        handleSubmit
        //isoff={true}
      />
    </div>
  )
}
