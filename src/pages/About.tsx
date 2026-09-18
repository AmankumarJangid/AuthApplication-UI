"use client";

import React from 'react'
import { Terminal, Code2, Rocket, Sparkles, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import TerminalComponent from '@/components/TerminalComponent';

// --- Custom SVG Icons for Brands ---
const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path>
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const About = () => {
  return (
    <div className="w-full min-h-screen bg-background text-foreground flex flex-col justify-between p-6 md:p-12 overflow-x-hidden select-none relative">
      {/* Background Glow Accent */}

      
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Main Container */}
      <main className="max-w-4xl mx-auto w-full space-y-12 my-auto z-10">
        {/* Hero Header */}
        <section className="text-center space-y-4">
          <Badge variant="outline" className="gap-2 px-4 py-1.5 border-primary/30 bg-primary/10 text-xs sm:text-sm">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>Developer & Creator</span>
          </Badge>
          
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
            About <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">GameGrind.Dev</span>
          </h1>
          
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Designed  by <strong className="text-foreground">Aman Jangid</strong> — for crafting modern, high-performance web applications, games and dynamic visual experiences.
          </p>
        </section>

        <TerminalComponent/>

        {/* Feature Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-card/50 backdrop-blur-md border-border/50 hover:border-primary/50 transition-all duration-300">
            <CardHeader>
              <Terminal className="w-8 h-8 text-primary mb-2" />
              <CardTitle className="text-lg">Modern Stack</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm">
                Built with Next.js/React, Tailwind CSS, and TypeScript for fast rendering and fluid interactions.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-md border-border/50 hover:border-primary/50 transition-all duration-300">
            <CardHeader>
              <Code2 className="w-8 h-8 text-primary mb-2" />
              <CardTitle className="text-lg">3D UI & Motion</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm">
                Specializing in perspective transforms, responsive layout structures, and smooth micro-interactions.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-md border-border/50 hover:border-primary/50 transition-all duration-300">
            <CardHeader>
              <Rocket className="w-8 h-8 text-primary mb-2" />
              <CardTitle className="text-lg">The Grind</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm">
                Focused on turning complex design ideas into clean, user-centric web applications.
              </CardDescription>
            </CardContent>
          </Card>
        </section>

        {/* Bio Card Section */}
        <Card className="bg-card/30 backdrop-blur-lg border-border/40 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl">Hey, I&apos;m Aman 👋</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              I built <strong>GameGrind.Dev</strong> as a space to explore cutting-edge web development, interactive frontend design, and scalable full-stack applications. My goal is to bridge the gap between aesthetic visual design and high-efficiency software engineering.
            </p>

            {/* Social Links */}
            <div className="pt-6 border-t border-border/30 flex flex-wrap gap-4 items-center justify-between">
              <span className="text-sm text-muted-foreground">Connect with me:</span>
              <div className="flex gap-3">
                <Button variant="outline" size="icon" asChild className="hover:border-primary hover:bg-primary/10">
                  <a href="https://github.com" target="_blank" rel="noreferrer">
                    <GithubIcon className="w-4 h-4" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild className="hover:border-primary hover:bg-primary/10">
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild className="hover:border-primary hover:bg-primary/10">
                  <a href="mailto:aman@example.com">
                    <Mail className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      

      {/* Footer */}
      <footer className="text-center text-xs text-muted-foreground py-6 z-10">
        © {new Date().getFullYear()} GameGrind.Dev • Designed & Built by Aman Jangid
      </footer>
    </div>
  );
}

export default About
