import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function TechMarquee() {
    const techs = [
        "React", "Node.js", "TypeScript", "Rust", "Go", "Python",
        "Docker", "Kubernetes", "AWS", "Next.js", "Tailwind", "GraphQL",
        "PostgreSQL", "Redis", "MongoDB", "Svelte", "Vue"
    ]

    // Duplicate for infinite loop
    const duplicatedTechs = [...techs, ...techs]

    return (
        <section className="py-12 border-y bg-secondary/10 overflow-hidden">
            <div className="container mx-auto px-4 mb-8 text-center">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">Trusted by builders using</p>
            </div>
            <div className="relative flex w-full overflow-hidden">
                {/* Gradients for fade effect */}
                <div className="absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-background to-transparent"></div>
                <div className="absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-background to-transparent"></div>

                <motion.div
                    className="flex gap-16 items-center whitespace-nowrap"
                    animate={{ x: "-50%" }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
                >
                    {duplicatedTechs.map((tech, i) => (
                        <div key={i} className="text-xl font-bold text-muted-foreground/50 hover:text-primary transition-colors cursor-default">
                            {tech}
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
