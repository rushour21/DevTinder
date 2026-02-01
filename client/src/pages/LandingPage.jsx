import Navbar from "@/components/ui/navbar"
import Hero3D from "@/components/Landing/Hero3D"
import CodeWindow from "@/components/Landing/CodeWindow"
import BentoFeatures from "@/components/Landing/BentoFeatures"
import TechMarquee from "@/components/Landing/TechMarquee"
import Footer from "@/components/ui/footer"
import { Button } from "@/components/ui/button"
import { Code, GitBranch, Rocket } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Link } from "react-router-dom"

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden selection:bg-primary/20 selection:text-primary">
            <Navbar />

            <main>
                <Hero3D />

                <TechMarquee />

                <div id="how-it-works" className="py-24 relative overflow-hidden">
                    {/* Connecting Line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent hidden lg:block -translate-x-1/2"></div>

                    <div className="container mx-auto px-4 relative z-10">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">How it works</h2>
                            <p className="mt-4 text-lg text-muted-foreground">Three steps to your next ship.</p>
                        </div>

                        <div className="grid gap-12 lg:grid-cols-3 relative text-center">
                            {[
                                { icon: Code, title: "Create Profile", desc: "Sync your GitHub. Select your stack. Define your goals." },
                                { icon: GitBranch, title: "Match & Connect", desc: "Our algorithm finds developers with complementary skills." },
                                { icon: Rocket, title: "Build Together", desc: "Launch projects, hackathons, or startups." }
                            ].map((step, i) => (
                                <div key={i} className="flex flex-col items-center bg-background p-6 rounded-xl border border-transparent hover:border-border/50 transition-colors">
                                    <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mb-6 text-primary shadow-inner">
                                        <step.icon className="h-8 w-8" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <CodeWindow />

                <BentoFeatures />

                <section id="use-cases" className="py-24 bg-foreground text-background">
                    <div className="container mx-auto px-4 text-center mb-16">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Success Stories</h2>
                    </div>
                    <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
                        {[
                            { quote: "Found my co-founder here in 2 days. We just raised our seed round.", author: "Sarah J.", role: "CTO @ Nexus" },
                            { quote: "Finally a place where people actually want to code, not just talk about it.", author: "David K.", role: "Senior Eng @ Stripe" },
                            { quote: "Built a hackathon project that won $10k. Best team matching ever.", author: "Mike T.", role: "Student" }
                        ].map((testimonial, i) => (
                            <Card key={i} className="bg-white/5 border-white/10 text-gray-200">
                                <CardContent className="pt-6">
                                    <p className="italic mb-6 text-lg">"{testimonial.quote}"</p>
                                    <div>
                                        <h4 className="font-bold text-white">{testimonial.author}</h4>
                                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                <section className="py-32 relative overflow-hidden">
                    <div className="absolute inset-0 bg-primary/5 -z-10"></div>
                    <div className="container mx-auto px-4 text-center space-y-8 max-w-3xl">
                        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">Ready to ship?</h2>
                        <p className="text-xl text-muted-foreground pb-4">Join 10,000+ developers building the future today.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/login" state={{ isLogin: false }}>
                                <Button size="lg" className="h-14 px-10 text-lg shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
                                    Join Nexer Now
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
