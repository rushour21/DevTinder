import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionsSlice';
import { MessageCircle } from "lucide-react";
import { Link } from 'react-router-dom';
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Connections() {
    const connections = useSelector((store) => store.connections)
    const dispatch = useDispatch();

    const fetchconnections = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/connections`, {
                withCredentials: true
            });
            dispatch((addConnections(res?.data?.data)))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchconnections();
    }, [])

    if (!connections) return null;

    return (
        <div className='container mx-auto p-4 max-w-4xl py-8'>
            <h1 className='text-3xl font-bold mb-8 text-center text-foreground'>My Connections</h1>

            {connections.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground border border-dashed rounded-lg bg-secondary/5">
                    No connections yet. start swiping!
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {connections.map((connection) => {
                        const { _id, firstName, lastName, photoUrl, age, gender, about } = connection
                        return (
                            <Card key={_id} className="overflow-hidden hover:shadow-md transition-all group">
                                <div className="h-24 bg-gradient-to-r from-primary/20 to-secondary/20"></div>
                                <div className="px-6 -mt-12 mb-4 flex justify-between items-end">
                                    <div className="h-24 w-24 rounded-full border-4 border-background bg-white overflow-hidden shadow-sm">
                                        <img
                                            src={photoUrl || "https://geographyandyou.com/images/user-profile.png"}
                                            alt={firstName}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <Link to={"/chat"} state={{ targetedId: _id, targetedName: firstName, targetedPhoto: photoUrl }}>
                                        <Button size="sm" className="rounded-full gap-2 shadow-sm mb-2">
                                            <MessageCircle className="h-4 w-4" /> Chat
                                        </Button>
                                    </Link>
                                </div>

                                <div className="px-6 pb-6 space-y-2">
                                    <div>
                                        <h3 className="font-bold text-lg">{firstName} {lastName}</h3>
                                        <p className="text-xs uppercase font-semibold text-muted-foreground">{age} • {gender}</p>
                                    </div>
                                    <p className="text-sm text-foreground/80 line-clamp-2 min-h-[2.5em]">{about || "No bio available."}</p>
                                </div>
                            </Card>
                        )
                    })}
                </div>
            )}
        </div>
    )
}