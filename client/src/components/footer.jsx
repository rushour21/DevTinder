import React from 'react'
import NexerLogo from "../assets/NEXER LOGO.png"

export default function Footer() {
    return (
        <footer className="w-full py-6 bg-background border-t border-border mt-auto">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-muted-foreground text-sm">
                <div className="flex items-center gap-2">
                    <img src={NexerLogo} alt="Nexer" className="h-10 w-auto opacity-70 grayscale hover:grayscale-0 transition-all" />
                    <p>© {new Date().getFullYear()} Nexer. All rights reserved.</p>
                </div>
                <div className="flex gap-6 mt-4 md:mt-0">
                    <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
                    <a href="#" className="hover:text-primary transition-colors">Support</a>
                </div>
            </div>
        </footer>
    )
}
