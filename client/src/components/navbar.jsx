import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeUser } from '../utils/userSlice';
import { LogOut, User as UserIcon, Users, MessageSquare, UserPlus, Menu } from "lucide-react"
import { Button } from "../components/ui/button"
import { cn } from "../lib/utils"
import NexerLogo from "../assets/NEXER LOGO.png"

export default function Navbar() {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const handleLogout = () => {
        dispatch(removeUser());
        navigate("/login");
    }

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container px-4 h-16 flex items-center justify-between">
                <Link to={user ? "/feed" : "/"} className="flex items-center gap-2">
                    <img src={NexerLogo} alt="Nexer" className="h-[100px] w-auto object-contain md:h-28" />
                </Link>

                <div className="flex items-center gap-4">
                    {user ? (
                        <>
                            <span className="text-sm font-medium text-muted-foreground hidden md:inline-block">
                                Welcome, {user.firstName}
                            </span>
                            <div className="relative">
                                <button
                                    onClick={() => setOpen(!open)}
                                    className="p-2 rounded-md hover:bg-secondary/50 transition-colors focus:outline-none"
                                >
                                    <Menu className="h-6 w-6 text-foreground" />
                                </button>

                                {open && (
                                    <div className="absolute right-0 mt-2 w-56 rounded-xl border border-border/50 bg-background/95 backdrop-blur-sm shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                                        <div className="p-2 space-y-1">
                                            <Link
                                                to="/profile"
                                                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground rounded-lg hover:bg-secondary/50 transition-colors"
                                                onClick={() => setOpen(false)}
                                            >
                                                <UserIcon className="h-4 w-4 text-primary" /> Profile
                                            </Link>
                                            <Link
                                                to="/connections"
                                                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground rounded-lg hover:bg-secondary/50 transition-colors"
                                                onClick={() => setOpen(false)}
                                            >
                                                <Users className="h-4 w-4 text-primary" /> Connections
                                            </Link>
                                            <Link
                                                to="/requests"
                                                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground rounded-lg hover:bg-secondary/50 transition-colors"
                                                onClick={() => setOpen(false)}
                                            >
                                                <UserPlus className="h-4 w-4 text-primary" /> Requests
                                            </Link>
                                            <Link
                                                to="/chat"
                                                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground rounded-lg hover:bg-secondary/50 transition-colors"
                                                onClick={() => setOpen(false)}
                                            >
                                                <MessageSquare className="h-4 w-4 text-primary" /> Chat
                                            </Link>
                                        </div>
                                        <div className="h-px bg-border/50 my-0"></div>
                                        <div className="p-2">
                                            <button
                                                onClick={() => {
                                                    setOpen(false);
                                                    handleLogout();
                                                }}
                                                className="flex w-full items-center gap-2 px-3 py-2 text-sm font-medium text-destructive rounded-lg hover:bg-destructive/10 transition-colors"
                                            >
                                                <LogOut className="h-4 w-4" /> Logout
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Overlay to close dropdown when clicking outside */}
                                {open && (
                                    <div
                                        className="fixed inset-0 z-40 bg-transparent"
                                        onClick={() => setOpen(false)}
                                    ></div>
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to="/login" state={{ isLogin: false }}>
                                <Button>Join Now</Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}
