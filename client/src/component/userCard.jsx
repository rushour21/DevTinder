import React from 'react'
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "lucide-react"

// Fallback visual non-swipe component for profile preview or matches
export default function UserCard({ user }) {
    if (!user) return null;
    const { firstName, lastName, photoUrl, age, gender, about } = user;

    return (
        <Card className="w-96 shadow-lg overflow-hidden border-border/50">
            <div className='h-64 overflow-hidden relative'>
                <img
                    src={photoUrl}
                    alt="User"
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                    <h2 className="text-2xl font-bold">{firstName} {lastName}, {age}</h2>
                    <p className="text-sm opacity-90 capitalize">{gender}</p>
                </div>
            </div>
            <CardContent className="p-6">
                <p className="text-muted-foreground">{about || "No bio available."}</p>
            </CardContent>
        </Card>
    )
}
