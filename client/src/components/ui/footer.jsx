import { Code, Code2, Github, Twitter, Disc } from "lucide-react"

export default function Footer() {
    return (
        <footer className="bg-foreground text-background py-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div>
                        <div className="mb-4 flex items-center gap-2">
                            <div className="bg-primary/10 p-2 rounded-lg">
                                <Code className="h-5 w-5 text-primary" />
                            </div>
                            <span className="font-bold text-lg">Nexer</span>
                        </div>
                        <p className="text-gray-400 text-sm">
                            The open-source platform for developer connection and collaboration.
                        </p>
                        <div className="flex gap-4 mt-4">
                            <Github className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
                            <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
                            <Disc className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div>
                        <h4 className="font-semibold mb-4 text-primary">Product</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li className="hover:text-white cursor-pointer">Features</li>
                            <li className="hover:text-white cursor-pointer">Pricing</li>
                            <li className="hover:text-white cursor-pointer">Use Cases</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 text-primary">Resources</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li className="hover:text-white cursor-pointer">Blog</li>
                            <li className="hover:text-white cursor-pointer">Community</li>
                            <li className="hover:text-white cursor-pointer">Help Center</li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-semibold mb-4 text-primary">Newsletter</h4>
                        <p className="text-sm text-gray-400 mb-4">Latest updates, directly to your inbox.</p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="email@example.com"
                                className="bg-white/10 border-none rounded px-3 py-2 text-sm w-full focus:ring-1 focus:ring-primary outline-none"
                            />
                            <button className="bg-primary text-primary-foreground px-3 py-2 rounded text-sm font-medium hover:bg-primary/90">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} Nexer. All rights reserved.
                </div>
            </div>
        </footer>
    )
}
