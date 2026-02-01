import { Button } from "@/components/ui/button"
import { Code } from "lucide-react"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Link, useNavigate } from "react-router-dom"

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <nav className={cn(
            "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
            scrolled ? "bg-background/80 backdrop-blur-md border-border/40 shadow-sm" : "bg-transparent"
        )}>
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 cursor-pointer"> {/* Changed div to Link and onClick to to */}
                    <div className="bg-primary/10 p-2 rounded-lg">
                        <Code className="h-6 w-6 text-primary" /> {/* Changed Code2 to Code and size */}
                    </div>
                    <span className="text-2xl font-bold tracking-tight text-foreground">Nexer</span> {/* Changed text and classes */}
                </Link>

                {/* Links */}
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
                    <a href="#features" className="hover:text-foreground transition-colors">Features</a>
                    <a href="#how-it-works" className="hover:text-foreground transition-colors">How it Works</a>
                    <a href="#use-cases" className="hover:text-foreground transition-colors">Use Cases</a>
                </div>

                {/* CTA */}
                <div className="flex items-center gap-4">
                    <Button size="sm" onClick={() => navigate('/login', { state: { isLogin: false } })}>
                        Join Nexer Now
                    </Button>
                </div>
            </div>
        </nav>
    )
}
