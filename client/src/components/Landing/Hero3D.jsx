import { motion, useMotionValue, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Github, Code, Database, Globe } from "lucide-react"
import { Link } from "react-router-dom"

export default function Hero3D() {
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const rotateX = useTransform(y, [-100, 100], [30, -30])
    const rotateY = useTransform(x, [-100, 100], [-30, 30])

    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
            {/* Background Image & Grid */}
            <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop')] bg-cover bg-center opacity-5"></div>
                <div className="absolute inset-0 bg-background/90 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>
            </div>

            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <div className="space-y-8 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 text-secondary-foreground text-xs font-medium border border-secondary">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            v1.0 is now live
                        </div>

                        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-balance bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/70">
                            Find developers worth <br />
                            <span className="text-primary">building with</span>.
                        </h1>

                        <p className="max-w-xl mx-auto lg:mx-0 text-lg text-muted-foreground leading-relaxed">
                            Discover, connect, and collaborate with developers based on real skills and project intent. Stop swiping on resumes.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                            <Link to="/login" state={{ isLogin: false }}>
                                <Button size="lg" className="h-12 px-8 text-base shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all">
                                    Start Connecting <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>

                        <div className="pt-8 flex items-center justify-center lg:justify-start gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                            {/* Tech Logos Placeholder */}
                            <div className="flex items-center gap-2"><div className="h-6 w-6 rounded bg-foreground/20"></div> <span className="font-semibold text-sm">React</span></div>
                            <div className="flex items-center gap-2"><div className="h-6 w-6 rounded bg-foreground/20"></div> <span className="font-semibold text-sm">Node</span></div>
                            <div className="flex items-center gap-2"><div className="h-6 w-6 rounded bg-foreground/20"></div> <span className="font-semibold text-sm">Rust</span></div>
                        </div>
                    </div>

                    {/* 3D Card Visual */}
                    <div className="relative flex items-center justify-center perspective-1000">
                        <motion.div
                            style={{ x, y, rotateX, rotateY, z: 100 }}
                            drag
                            dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
                            dragElastic={0.1}
                            className="relative z-10 w-full max-w-sm bg-card border border-border/50 rounded-xl shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing"
                            whileHover={{ scale: 1.02 }}
                        >
                            {/* Mock UI Header */}
                            <div className="h-32 bg-gradient-to-br from-primary/20 via-secondary/20 to-background p-6 flex flex-col justify-end">
                                <div className="h-16 w-16 rounded-full border-4 border-background bg-muted overflow-hidden shadow-lg mb-[-40px] z-20">
                                    <img src="https://github.com/shadcn.png" alt="Avatar" className="h-full w-full object-cover" />
                                </div>
                            </div>

                            {/* Mock UI Content */}
                            <div className="pt-12 px-6 pb-6 space-y-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-lg">Alex Dev</h3>
                                        <p className="text-sm text-muted-foreground">Frontend Architect</p>
                                    </div>
                                    <div className="text-xs font-mono bg-secondary/50 px-2 py-1 rounded text-primary">Open to work</div>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    <span className="text-xs border px-2 py-1 rounded flex items-center gap-1"><Code className="h-3 w-3" /> React</span>
                                    <span className="text-xs border px-2 py-1 rounded flex items-center gap-1"><Database className="h-3 w-3" /> Postgres</span>
                                    <span className="text-xs border px-2 py-1 rounded flex items-center gap-1"><Globe className="h-3 w-3" /> Remote</span>
                                </div>

                                <div className="text-sm text-foreground/80 leading-snug">
                                    "Looking for a backend partner to build a SaaS for AI-generated documentation. DM if you know LangChain."
                                </div>

                                <div className="grid grid-cols-2 gap-3 pt-2">
                                    <Button className="w-full bg-foreground text-background hover:bg-foreground/90 h-9">Connect</Button>
                                    <Button variant="outline" className="w-full h-9">View Profile</Button>
                                </div>
                            </div>
                        </motion.div>

                        {/* Decorative Elements behind card */}
                        <div className="absolute top-10 right-10 -z-10 h-64 w-64 bg-primary/30 rounded-full blur-[80px]"></div>
                        <div className="absolute -bottom-10 -left-10 -z-10 h-64 w-64 bg-secondary/30 rounded-full blur-[80px]"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}
