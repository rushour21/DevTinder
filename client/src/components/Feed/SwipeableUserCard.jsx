import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion"
import { useDispatch } from "react-redux"
import { removeFeed } from "../../utils/feedSlice"
import axios from "axios"
import { useState, useEffect } from "react"
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

    useEffect(() => {
        const handleResize = () => {
            x.set(0)
        }
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [x])

    if (!user) return null

    // Fallback skills if none provided
    const displaySkills = user.skills && user.skills.length > 0 ? user.skills : ["JavaScript", "React", "Node.js"]

    return (
        <motion.div
            className="absolute top-5 w-full max-w-sm cursor-grab active:cursor-grabbing perspective-1000 touch-none"
            style={{ x, rotate, opacity, zIndex: isTop ? 10 : 1 }}
            drag="x"
            dragListener={isTop}
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
                <div className="pt-20 px-8 pb-10 space-y-8 text-center h-[500px] flex flex-col justify-between">
                    <div>
                        <div className="space-y-2">
                            <h2 className="font-bold text-3xl text-foreground">{user.firstName} {user.lastName}</h2>
                            <p className="text-base font-medium text-muted-foreground uppercase tracking-wide">{user.age} • {user.gender}</p>
                        </div>

                        <div className="flex flex-wrap gap-2 justify-center mt-6">
                            {displaySkills.slice(0, 5).map((skill, i) => (
                                <span key={i} className="text-xs font-semibold border border-transparent bg-secondary/50 text-secondary-foreground px-3 py-1.5 rounded-full flex items-center gap-1 hover:bg-secondary/70 transition-colors">
                                    {skill}
                                </span>
                            ))}
                        </div>

                        <div className="text-base text-muted-foreground leading-relaxed px-2 mt-6 line-clamp-4">
                            "{user.about || "Looking to connect with like-minded developers."}"
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 pt-2">
                        <Button
                            variant="destructive"
                            onClick={() => handleSwipe("ignored")}
                            className="w-full h-12 rounded-xl text-base font-semibold shadow-sm hover:shadow-md transition-all"
                        >
                            Ignore
                        </Button>
                        <Button
                            onClick={() => handleSwipe("interested")}
                            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 rounded-xl text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
                        >
                            Interested
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
