import React, { useRef, useState, useEffect } from 'react'
import UserCard from './userCard'
import axios from 'axios'
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input" // Assuming Input component logic reuse or direct styles
import { cn } from "@/lib/utils"
import { useNavigate } from "react-router-dom"

export default function EditProfile({ user }) {
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    photoUrl: user.photoUrl,
    age: user.age,
    gender: user.gender,
    about: user.about,
    skills: user.skills ? user.skills.join(", ") : ""
  })
  const [toast, setToast] = useState(null)
  const timeoutRef = useRef(null);
  const navigate = useNavigate()

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    try {
      // Parse skills string back to array if needed by backend, assuming backend handles array. 
      // Current userSchema says [String].
      const skillsArray = formData.skills.split(",").map(s => s.trim()).filter(Boolean)

      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/profile/update`,
        { ...formData, skills: skillsArray },
        { withCredentials: true }
      )

      if (res.status === 200) {
        setToast({ type: 'success', message: 'Profile updated successfully' })
        timeoutRef.current = setTimeout(() => {
          navigate('/feed')
        }, 2000)
      }
    } catch (error) {
      setToast({ type: 'error', message: 'Failed to update profile' })
      console.log(error)
    } finally {
      setTimeout(() => setToast(null), 3000)
    }
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full max-w-5xl items-start">
      {/* Toast Notification */}
      {toast && (
        <div className={cn(
          "fixed top-20 right-4 z-50 px-4 py-3 rounded-md shadow-lg text-sm font-medium animate-in slide-in-from-right",
          toast.type === 'success' ? "bg-green-100 text-green-800 border border-green-200" : "bg-destructive/10 text-destructive border border-destructive/20"
        )}>
          {toast.message}
        </div>
      )}

      {/* Edit Form */}
      <Card className="flex-1 shadow-md w-full">
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
          <CardDescription>Update your personal information and skills.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">First Name</label>
              <Input name="firstName" value={formData.firstName} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Last Name</label>
              <Input name="lastName" value={formData.lastName} onChange={handleChange} />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Photo URL</label>
            <Input name="photoUrl" value={formData.photoUrl} onChange={handleChange} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Age</label>
              <Input name="age" type="number" value={formData.age} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Gender</label>
              <select name="gender" value={formData.gender} onChange={handleChange} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Skills (Comma separated)</label>
            <Input name="skills" value={formData.skills} onChange={handleChange} placeholder="React, Node.js, ..." />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">About</label>
            <textarea name="about" value={formData.about} onChange={handleChange} rows={4} className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
          </div>

        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleSubmit}>Save Changes</Button>
        </CardFooter>
      </Card>

      {/* Live Preview */}
      <div className='flex flex-col gap-4 items-center'>
        <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Preview</span>
        <UserCard user={{ ...formData, skills: formData.skills.split(",").map(s => s.trim()).filter(Boolean) }} />
      </div>
    </div>
  )
}
