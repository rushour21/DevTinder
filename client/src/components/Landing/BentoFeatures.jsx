import { motion } from "framer-motion"
import { Users, Code2, Rocket, ShieldCheck, Zap, GitPullRequest } from "lucide-react"

export default function BentoFeatures() {
    const features = [
        {
            title: "Skill-Based Matching",
            description: "Match with developers who complement your stack. React needs Node. Rust needs Wasm.",
            icon: Code2,
            className: "md:col-span-2 bg-gradient-to-br from-primary/10 to-transparent",
        },
        {
            title: "Project Intent",
            description: "Filter by Hackathon, Side Project, or Startup. No misalignment.",
            icon: Rocket,
            className: "md:col-span-1",
        },
        {
            title: "GitHub Verified",
            description: "Green squares don't lie. Verify activity and languages directly.",
            icon: GitPullRequest,
            className: "md:col-span-1",
        },
        {
            title: "Zero Spam",
            description: "Strict community guidelines. No recruiters allowed in the matching pool.",
            icon: ShieldCheck,
            className: "md:col-span-2",
        },
    ]

    return (
        <section id="features" className="py-24">
            <div className="container mx-auto px-4">
                <div className="mb-16 text-center max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Everything you need to ship.</h2>
                    <p className="mt-4 text-lg text-muted-foreground">Focus on building. We handle the discovery.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8 auto-rows-[250px]">
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.02 }}
                            className={`group relative overflow-hidden rounded-2xl border bg-card p-8 shadow-sm transition-all hover:shadow-md ${feature.className}`}
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-5 bg-foreground rounded-bl-3xl">
                                <feature.icon className="h-24 w-24" />
                            </div>

                            <div className="relative z-10 flex flex-col h-full justify-between">
                                <div className="rounded-full bg-primary/10 w-fit p-3 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                                    <feature.icon className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                    <p className="text-muted-foreground">{feature.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
