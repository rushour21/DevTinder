import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion"
import { useDispatch } from "react-redux"
import { removeFeed } from "../../utils/feedSlice"
import axios from "axios"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Code, Database, Globe } from "lucide-react"

export default function SwipeableUserCard({ user, isTop }) {
    const dispatch = useDispatch()
    const controls = useAnimation()

    const x = useMotionValue(0)
    const rotate = useTransform(x, [-200, 200], [-15, 15])
    const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0])

    const handleDragEnd = async (_, info) => {
        const offset = info.offset.x
        const velocity = info.velocity.x

        if (offset > 150 || velocity > 800) {
            await handleSwipe("interested")
        } else if (offset < -150 || velocity < -800) {
            await handleSwipe("ignored")
        }
    }

    const handleSwipe = async (status) => {
        try {
            await controls.start({ x: status === "interested" ? 500 : -500, opacity: 0, transition: { duration: 0.2 } })
            dispatch(removeFeed(user._id))
            await axios.post(`${import.meta.env.VITE_API_URL}/request/send/${status}/${user._id}`, {}, { withCredentials: true })
        } catch (error) {
            console.error("Swipe Error:", error)
        }
    }

    if (!user) return null

    // Fallback skills if none provided
    const displaySkills = user.skills && user.skills.length > 0 ? user.skills : ["JavaScript", "React", "Node.js"]

    return (
        <motion.div
            className="absolute top-0 w-full max-w-sm cursor-grab active:cursor-grabbing perspective-1000"
            style={{ x, rotate, opacity, zIndex: isTop ? 10 : 1 }}
            drag={isTop ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            animate={controls}
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
        >
            <div className="relative z-10 w-full bg-card border border-border/50 rounded-xl shadow-2xl overflow-hidden">
                {/* Header / Banner */}
                <div className="h-32 bg-gradient-to-br from-primary/20 via-secondary/20 to-background p-6 flex flex-col justify-end">
                    <div className="mx-auto h-24 w-24 rounded-full border-4 border-background bg-muted overflow-hidden shadow-lg mb-[-50px] z-20">
                        <img
                            src={user.photoUrl || "https://geographyandyou.com/images/user-profile.png"}
                            alt={user.firstName}
                            className="h-full w-full object-cover pointer-events-none"
                        />
                    </div>
                </div>

                {/* Content */}
                <div className="pt-16 px-6 pb-8 space-y-6 text-center">
                    <div className="space-y-1">
                        <h2 className="font-bold text-2xl text-foreground">{user.firstName} {user.lastName}</h2>
                        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">{user.age} • {user.gender}</p>
                    </div>

                    <div className="flex flex-wrap gap-2 justify-center">
                        {displaySkills.slice(0, 5).map((skill, i) => (
                            <span key={i} className="text-xs font-medium border border-border bg-secondary/30 px-3 py-1 rounded-full text-foreground/80 flex items-center gap-1">
                                {skill}
                            </span>
                        ))}
                    </div>

                    <div className="text-sm text-muted-foreground leading-relaxed px-4">
                        "{user.about || "Looking to connect with like-minded developers."}"
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4">
                        <Button
                            onClick={() => handleSwipe("interested")}
                            className="w-full bg-foreground text-background hover:bg-foreground/90 h-11"
                        >
                            Connect
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => console.log('View Profile Clicked')} // Placeholder for view profile
                            className="w-full h-11"
                        >
                            View Profile
                        </Button>
                    </div>
                </div>

                {/* Swipe Overlays */}
                <motion.div style={{ opacity: useTransform(x, [100, 150], [0, 1]) }} className="absolute top-10 right-10 z-30 border-4 border-green-500 rounded-lg px-4 py-2 -rotate-12 pointer-events-none">
                    <span className="text-2xl font-bold text-green-500 uppercase tracking-widest">Connect</span>
                </motion.div>
                <motion.div style={{ opacity: useTransform(x, [-150, -100], [1, 0]) }} className="absolute top-10 left-10 z-30 border-4 border-destructive rounded-lg px-4 py-2 rotate-12 pointer-events-none">
                    <span className="text-2xl font-bold text-destructive uppercase tracking-widest">Pass</span>
                </motion.div>
            </div>
        </motion.div>
    )
}
