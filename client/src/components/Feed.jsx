import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice';
import axios from 'axios';
import SwipeableUserCard from '../components/Feed/SwipeableUserCard';
import { Loader2 } from "lucide-react"

export default function Feed() {
    const feed = useSelector((store) => store.feed)
    const dispatch = useDispatch();

    const getFeed = async () => {
        if (feed && feed.length > 0) return;
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/feed`, { withCredentials: true })
            dispatch(addFeed(res?.data))
        } catch (error) {
            console.error("Feed Fetch Error:", error)
        }
    }

    useEffect(() => {
        getFeed();
    }, [])

    if (!feed) return (
        <div className="flex flex-1 justify-center items-center h-[calc(100vh-64px)]">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
    )

    if (feed.length === 0) return (
        <div className="flex flex-1 justify-center items-center h-[calc(100vh-64px)] text-center p-8">
            <div className="space-y-4">
                <h2 className="text-3xl font-bold">You've seen everyone!</h2>
                <p className="text-muted-foreground">Come back later for new developers.</p>
            </div>
        </div>
    )

    return (
        <div className='flex flex-1 justify-center items-center h-[calc(100vh-64px)] overflow-hidden relative w-full bg-secondary/10'>
            <div className="relative w-full max-w-sm h-[680px]">
                {feed.map((user, index) => (
                    <SwipeableUserCard
                        key={user._id}
                        user={user}
                        isTop={index === 0}
                    />
                )).reverse()}
                {/* Reverse so the first item in array is on top (rendered last) - wait, standard map is better if absolute positioned?
                If absolute:
                Item 0 z-0
                Item 1 z-1
                ...
                We want Item 0 to be on TOP.
                So we actually want to Render in REVERSE order.
                Item N (Bottom) -> Item 0 (Top).
                Wait, if feed[0] is the top card, and we map:
                Card 0, Card 1, Card 2.
                Card 2 will obscure Card 0 in DOM order.
                So we SHOULD reverse the array before mapping for stacking context if using absolute positioning.
                OR we set z-index manually. SwipeableUserCard sets z-10 for isTop.
                Let's reverse to ensure standard DOM stacking order puts first elements last (on top) or use z-index.
                Let's stick to simple z-index control in the child or reverse mapping.
                Actually, simpler: Just render the top card? 
                No, we want to see the card BEHIND it.
                So we should render at least 2 cards.
                Let's render the whole stack but reversed, so feed[0] is last in DOM (top).
            */}
            </div>
        </div>
    )
}
