"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowRight, BarChart3, Brain, Cpu, Database, Globe, LineChart, MapPin, Palette, Recycle, ShieldCheck } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useRef } from "react"

const AnimatedBackground = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background/30" />
    <div className="absolute inset-0 opacity-30 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)]">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=2971&auto=format&fit=crop')] bg-cover bg-center [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
    </div>
    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=2971&auto=format&fit=crop')] opacity-0 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] animate-pulse duration-10000" />
  </div>
);

const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  items, 
  buttonText, 
  buttonHref 
}: { 
  icon: React.ReactNode, 
  title: string, 
  description: string, 
  items: string[], 
  buttonText: string, 
  buttonHref: string 
}) => (
  <motion.div 
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
    className="h-full"
  >
    <Card className="h-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
      <CardHeader>
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="min-h-[60px]">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2.5 text-muted-foreground">
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary/50" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <Button className="mt-6 w-full group" variant="outline" asChild>
          <Link href={buttonHref}>
            {buttonText}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  </motion.div>
);

export default function HomePage() {
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (featuresRef.current) {
      const cards = featuresRef.current.querySelectorAll('.feature-card');
      cards.forEach((card) => observer.observe(card));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 sm:py-36">
        <AnimatedBackground />
        <div className="container relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl text-center"
          >
            <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
              <Brain className="mr-2 h-4 w-4" />
              AI-Powered Sustainability
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              Transforming <span className="text-primary">Metallurgy & Mining</span> with AI-Powered Lifecycle Assessment
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground text-pretty">
              Harness the power of artificial intelligence to optimize resource efficiency, reduce environmental impact, and drive sustainable practices across the mining and metallurgy value chain.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" className="group px-8" asChild>
                <Link href="/analysis" className="flex items-center">
                  Start Analysis
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="px-8" asChild>
                <Link href="/whiteboard" className="flex items-center">
                  Explore Whiteboard
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-b from-background to-muted/30">
        <div className="container">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { value: '10,000+', label: 'Data Points', icon: <Database className="h-8 w-8 text-primary" /> },
              { value: '95%', label: 'Accuracy', icon: <ShieldCheck className="h-8 w-8 text-primary" /> },
              { value: '50+', label: 'Mining Sites', icon: <MapPin className="h-8 w-8 text-primary" /> },
              { value: '24/7', label: 'AI Analysis', icon: <Cpu className="h-8 w-8 text-primary" /> },
            ].map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-card p-6 rounded-xl border text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold text-foreground">{stat.value}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 bg-muted/30">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl text-center mb-16"
          >
            <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
              Comprehensive LCA Platform
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Three powerful modules designed for complete lifecycle assessment and circular economy optimization
            </p>
          </motion.div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="feature-card"
              >
                <FeatureCard
                  icon={<BarChart3 className="h-6 w-6 text-primary" />}
                  title="Analysis Module"
                  description="AI-powered LCA analysis with manual material selection or India-specific mine data"
                  items={[
                    'Manual material selection',
                    'India-specific mine mapping',
                    'AI parameter estimation',
                    'Conventional vs sustainable reports'
                  ]}
                  buttonText="Explore Analysis"
                  buttonHref="/analysis"
                />
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="feature-card"
              >
                <FeatureCard
                  icon={<Palette className="h-6 w-6 text-primary" />}
                  title="Whiteboard"
                  description="Interactive LCA mapping with drag-and-drop process nodes and real-time calculations"
                  items={[
                    'Visual process mapping',
                    'Real-time impact calculations',
                    'Scenario comparison',
                    'Export capabilities'
                  ]}
                  buttonText="Try Whiteboard"
                  buttonHref="/whiteboard"
                />
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="feature-card"
              >
                <FeatureCard
                  icon={<Recycle className="h-6 w-6 text-primary" />}
                  title="Marketplace"
                  description="Sustainable material marketplace connecting buyers and sellers of recycled materials"
                  items={[
                    'E-waste recycling marketplace',
                    'Industrial byproducts exchange',
                    'Circular economy solutions',
                    'Sustainable sourcing'
                  ]}
                  buttonText="Visit Marketplace"
                  buttonHref="/marketplace"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Our AI-powered platform makes lifecycle assessment simple and effective
            </p>
          </div>

          <div className="mx-auto max-w-5xl">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-border" />
              
              {/* Steps */}
              <div className="space-y-16">
                {[
                  {
                    step: '1',
                    title: 'Select Materials',
                    description: 'Choose from our extensive database or input custom materials and processes.',
                    icon: <Database className="h-6 w-6" />
                  },
                  {
                    step: '2',
                    title: 'Configure Parameters',
                    description: 'Set your specific parameters and environmental impact categories.',
                    icon: <LineChart className="h-6 w-6" />
                  },
                  {
                    step: '3',
                    title: 'Run Analysis',
                    description: 'Our AI processes the data to provide comprehensive lifecycle insights.',
                    icon: <Cpu className="h-6 w-6" />
                  },
                  {
                    step: '4',
                    title: 'View Results',
                    description: 'Get detailed reports and visualizations of your environmental impact.',
                    icon: <Globe className="h-6 w-6" />
                  }
                ].map((item, index) => (
                  <motion.div 
                    key={item.step}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`relative flex items-center justify-between ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} gap-8`}
                  >
                    <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                        {item.step}
                      </span>
                      <h3 className="mt-4 text-xl font-semibold text-foreground">{item.title}</h3>
                      <p className="mt-2 text-muted-foreground">{item.description}</p>
                    </div>
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      {index % 2 === 0 && (
                        <div className="h-48 w-full rounded-xl bg-gradient-to-r from-primary/5 to-transparent p-1">
                          <div className="h-full w-full rounded-lg bg-muted/50"></div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Demo Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
              See It In Action
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Watch our quick demo to see how MineIndia AI can transform your sustainability efforts
            </p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative mx-auto max-w-4xl aspect-video bg-muted rounded-2xl overflow-hidden shadow-xl border border-border/50"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full">
                <iframe 
                  src="https://www.youtube.com/embed/bXISlqXpTi8?si=mI8szpjT3-nRZhnz" 
                  title="MineIndia AI Platform Demo" 
                  className="w-full h-full" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </motion.div>
          
          <div className="mt-8 text-center">
            <p className="text-muted-foreground text-sm">
              Can't see the video?{' '}
              <a 
                href="https://www.youtube.com/watch?v=bXISlqXpTi8" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Watch on YouTube
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=2971&auto=format&fit=crop')] bg-cover bg-center opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>
        
        <div className="container relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-4xl rounded-2xl bg-gradient-to-r from-primary/5 via-background to-primary/5 p-8 md:p-12 backdrop-blur-sm border border-border/50 shadow-xl"
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">Ready to Transform Your Sustainability Journey?</h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                Join leading metallurgy and mining companies in adopting sustainable practices with our AI-powered LCA platform.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Button size="lg" className="group px-8" asChild>
                  <Link href="/analysis" className="flex items-center">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="px-8" asChild>
                  <Link href="/contact" className="flex items-center">
                    Contact Sales
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background/50 backdrop-blur-sm">
        <div className="container py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <h3 className="text-lg font-semibold">MineIndia AI</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Empowering sustainable mining and metallurgy through AI-powered lifecycle assessment.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Product</h4>
              <ul className="mt-4 space-y-2">
                <li><Link href="/analysis" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Analysis</Link></li>
                <li><Link href="/whiteboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Whiteboard</Link></li>
                <li><Link href="/marketplace" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Marketplace</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium">Resources</h4>
              <ul className="mt-4 space-y-2">
                <li><Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Blog</Link></li>
                <li><Link href="/documentation" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Documentation</Link></li>
                <li><Link href="/case-studies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Case Studies</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium">Company</h4>
              <ul className="mt-4 space-y-2">
                <li><Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About Us</Link></li>
                <li><Link href="/careers" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Careers</Link></li>
                <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} MineIndia AI. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</Link>
              <Link href="/cookies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}