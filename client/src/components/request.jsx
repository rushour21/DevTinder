import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addRequest, removeRequest } from '../utils/requestSlice';
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { Check, X } from "lucide-react"

export default function Request() {
    const requests = useSelector((store) => store.requests)
    const dispatch = useDispatch();

    const fetchRequest = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/request/received`, {
                withCredentials: true
            })
            dispatch(addRequest(res?.data?.data))
        } catch (error) {
            console.log(error);
        }
    }

    const receiveRequest = async (status, _id) => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/request/review/${status}/${_id}`, {}, {
                withCredentials: true
            })
            dispatch(removeRequest(_id))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchRequest();
    }, []);

    if (!requests) return null;

    return (
        <div className='container mx-auto p-4 max-w-2xl py-8'>
            <h1 className='text-3xl font-bold mb-6 text-center text-foreground'>Pending Requests</h1>

            {requests.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground border border-dashed rounded-lg">
                    No pending requests
                </div>
            ) : (
                <div className="space-y-4">
                    {requests.map((request) => {
                        const { fromUserId } = request
                        return (
                            <Card key={request._id} className="flex flex-col sm:flex-row items-center p-4 gap-4 overflow-hidden">
                                <div className="h-16 w-16 min-w-[4rem] rounded-full overflow-hidden border border-border">
                                    <img
                                        src={fromUserId.photoUrl || "https://geographyandyou.com/images/user-profile.png"}
                                        alt={fromUserId.firstName}
                                        className="h-full w-full object-cover"
                                    />
                                </div>

                                <div className="flex-1 text-center sm:text-left space-y-1">
                                    <h3 className="text-lg font-bold">{fromUserId.firstName} {fromUserId.lastName}</h3>
                                    <p className="text-xs uppercase tracking-wide font-medium text-muted-foreground">{fromUserId.age} • {fromUserId.gender}</p>
                                    <p className="text-sm text-foreground/80 line-clamp-2">{fromUserId.about}</p>
                                </div>

                                <div className="flex gap-2 w-full sm:w-auto">
                                    <Button
                                        onClick={() => receiveRequest("rejected", request._id)}
                                        variant="outline"
                                        className="flex-1 sm:flex-none border-destructive/50 text-destructive hover:bg-destructive/10"
                                    >
                                        <X className="h-4 w-4 mr-1" /> Reject
                                    </Button>
                                    <Button
                                        onClick={() => receiveRequest("accepted", request._id)}
                                        className="flex-1 sm:flex-none bg-green-600 hover:bg-green-700 text-white"
                                    >
                                        <Check className="h-4 w-4 mr-1" /> Accept
                                    </Button>
                                </div>
                            </Card>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
