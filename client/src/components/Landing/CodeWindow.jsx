import { Terminal, X, Minimize2, Maximize2, AlertTriangle, MessageSquare, AlertOctagon } from "lucide-react"

export default function CodeWindow() {
    return (
        <section className="py-24 bg-secondary/20">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-12">

                    {/* Text Side */}
                    <div className="lg:w-1/2 space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-destructive/10 text-destructive text-xs font-bold uppercase tracking-wider">
                            <AlertTriangle className="h-4 w-4" /> The Problem
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
                            Networking is <span className="text-destructive decoration-destructive underline underline-offset-4 decoration-wavy">broken</span>.
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Most developer communities are noisy, unorganized, and full of spam. Finding a genuine collaborator is like debugging compiled code without source maps.
                        </p>
                        <div className="grid gap-4">
                            {[
                                { title: "LinkedIn is spammy", desc: "Recruiters and sales pitches.", icon: AlertOctagon },
                                { title: "Discord is chaotic", desc: "Thousands of messages, zero context.", icon: MessageSquare },
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 p-4 rounded-lg border bg-background/50 hover:bg-background transition-colors">
                                    <div className="rounded-full bg-destructive/10 p-2 text-destructive h-fit">
                                        <item.icon className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">{item.title}</h3>
                                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* VS Code Window Visual */}
                    <div className="lg:w-1/2 w-full">
                        <div className="rounded-xl overflow-hidden shadow-2xl border border-border/50 bg-[#1e1e1e] font-mono text-sm leading-relaxed relative group">
                            {/* Title Bar */}
                            <div className="bg-[#2d2d2d] px-4 py-2 flex items-center gap-2 border-b border-[#3e3e3e]">
                                <div className="flex gap-1.5">
                                    <div className="h-3 w-3 rounded-full bg-[#ff5f56]"></div>
                                    <div className="h-3 w-3 rounded-full bg-[#ffbd2e]"></div>
                                    <div className="h-3 w-3 rounded-full bg-[#27c93f]"></div>
                                </div>
                                <div className="ml-4 text-gray-400 text-xs flex items-center gap-2">
                                    <Terminal className="h-3 w-3" /> problem.ts
                                </div>
                            </div>

                            {/* Code Content */}
                            <div className="p-6 text-gray-300 overflow-x-auto">
                                <div className="flex">
                                    <div className="text-gray-600 select-none pr-4 text-right border-r border-gray-700 mr-4">
                                        {Array.from({ length: 12 }).map((_, i) => (
                                            <div key={i}>{i + 1}</div>
                                        ))}
                                    </div>
                                    <div className="w-full">
                                        <div><span className="text-[#c586c0]">const</span> <span className="text-[#dcdcaa]">findPartner</span> = <span className="text-[#c586c0]">async</span> () <span className="text-[#c586c0]">{`=>`}</span> <span className="text-[#ffd700]">{`{`}</span></div>

                                        <div className="pl-4 text-gray-500 italic">// TODO: Fix current networking issues</div>
                                        <div className="pl-4"><span className="text-[#c586c0]">try</span> <span className="text-[#ffd700]">{`{`}</span></div>

                                        <div className="pl-8 group/line hover:bg-white/5 rounded px-1 transition-colors relative">
                                            <span className="text-[#c586c0]">await</span> <span className="text-[#dcdcaa]">linkedIn</span>.<span className="text-[#dcdcaa]">connect</span>();
                                            <div className="absolute right-0 top-0 bg-destructive/20 text-destructive text-[10px] px-2 py-0.5 rounded opacity-0 group-hover/line:opacity-100 transition-opacity">
                                                Error: Too many aggressive recruiters
                                            </div>
                                        </div>

                                        <div className="pl-8 group/line hover:bg-white/5 rounded px-1 transition-colors relative">
                                            <span className="text-[#c586c0]">await</span> <span className="text-[#dcdcaa]">discordServer</span>.<span className="text-[#dcdcaa]">chat</span>();
                                            <div className="absolute right-0 top-0 bg-destructive/20 text-destructive text-[10px] px-2 py-0.5 rounded opacity-0 group-hover/line:opacity-100 transition-opacity">
                                                Warning: Noise level critical
                                            </div>
                                        </div>

                                        <div className="pl-4"><span className="text-[#ffd700]">{`}`}</span> <span className="text-[#c586c0]">catch</span> (<span className="text-[#9cdcfe]">err</span>) <span className="text-[#ffd700]">{`{`}</span></div>
                                        <div className="pl-8 text-destructive underline decoration-wavy"><span className="text-[#c586c0]">throw</span> <span className="text-[#ce9178]">"Connection failed: No genuine intent found"</span>;</div>
                                        <div className="pl-4"><span className="text-[#ffd700]">{`}`}</span></div>
                                        <div><span className="text-[#ffd700]">{`}`}</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
