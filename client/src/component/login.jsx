import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { useNavigate, useLocation } from 'react-router-dom'
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "../components/ui/card"
import { cn } from "../lib/utils"

export default function Login() {
    const location = useLocation()
    const [isLogin, setIsLogin] = useState(location.state?.isLogin !== undefined ? location.state.isLogin : true)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleAuth = async () => {
        try {
            setError("");
            if (isLogin) {
                const res = await axios.post(`${import.meta.env.VITE_API_URL}/login`,
                    { email, password },
                    { withCredentials: true }
                );
                dispatch(addUser(res.data));
                navigate('/feed');
            } else {
                const res = await axios.post(`${import.meta.env.VITE_API_URL}/signup`,
                    { firstName, lastName, email, password },
                    { withCredentials: true }
                );
                dispatch(addUser(res.data)); // Assuming signup also returns user data/token or logs them in
                navigate('/profile');
            }
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        }
    }

    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-64px)] bg-secondary/10 p-4">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">
                        {isLogin ? "Welcome back" : "Create an account"}
                    </CardTitle>
                    <CardDescription className="text-center">
                        {isLogin ? "Enter your credentials to access your account" : "Enter your details to get started"}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {!isLogin && (
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">First Name</label>
                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">Last Name</label>
                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                />
                            </div>
                        </div>
                    )}
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        />
                    </div>
                    {error && <p className="text-destructive text-sm text-center">{error}</p>}
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <Button className="w-full" onClick={handleAuth}>
                        {isLogin ? "Login" : "Create Account"}
                    </Button>
                    <div className="text-center text-sm">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <span
                            className="underline cursor-pointer font-medium text-primary hover:text-primary/80"
                            onClick={() => setIsLogin(!isLogin)}
                        >
                            {isLogin ? "Sign up" : "Login"}
                        </span>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}
