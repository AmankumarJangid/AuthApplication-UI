'use client'

import React from 'react'
import { motion } from 'motion/react'
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  ShieldCheck, 
  KeyRound, 
  Cookie, 
  Users, 
  ArrowRight
} from "lucide-react"

import { SiGoogle, SiGithub, SiFacebook } from "@icons-pack/react-simple-icons"

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
)

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
}

export default function SecurityFeaturesUI() {
  return (
    <div className="container mx-auto py-16 px-4 md:px-6">
      
      {/* Animated Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Robust Security Architecture
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Powered by Spring Boot and Spring Security, our platform ensures your data is protected with enterprise-grade authentication and authorization.
        </p>
      </motion.div>

      {/* Grid Container with Staggered Scroll Animations */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {/* Username & Password */}
        <motion.div variants={cardVariants} whileHover={{ y: -8, transition: { duration: 0.2 } }}>
          <Card className="flex flex-col h-full border-primary/10 shadow-sm hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 text-primary shadow-inner">
                <KeyRound size={24} />
              </div>
              <CardTitle>Standard Authentication</CardTitle>
              <CardDescription>Secure, encrypted credentials</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Traditional and reliable username and password login flow. Passwords are securely hashed using BCrypt before ever touching the database.
              </p>
            </CardContent>
            <CardFooter>
              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border-emerald-200">
                Active
              </Badge>
            </CardFooter>
          </Card>
        </motion.div>

        {/* JWT & Cookies */}
        <motion.div variants={cardVariants} whileHover={{ y: -8, transition: { duration: 0.2 } }}>
          <Card className="flex flex-col h-full border-primary/10 shadow-sm hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 text-primary shadow-inner">
                <Cookie size={24} />
              </div>
              <CardTitle>JWT & Cookie Sessions</CardTitle>
              <CardDescription>Stateless & secure token management</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                Advanced JSON Web Token implementation utilizing HttpOnly cookies to mitigate XSS attacks. Features an automated Access and Refresh token rotation system.
              </p>
              <div className="flex gap-2">
                <Badge variant="secondary" className="hover:bg-secondary/80">Access Token</Badge>
                <Badge variant="secondary" className="hover:bg-secondary/80">Refresh Token</Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Role Based Access */}
        <motion.div variants={cardVariants} whileHover={{ y: -8, transition: { duration: 0.2 } }}>
          <Card className="flex flex-col h-full border-primary/10 shadow-sm hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 text-primary shadow-inner">
                <Users size={24} />
              </div>
              <CardTitle>Role-Based Access</CardTitle>
              <CardDescription>Strict authorization controls</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Granular user categorization ensuring users only access what they are permitted to. Features distinct privileges for Admins, Users, and Moderators.
              </p>
            </CardContent>
            <CardFooter>
              <Badge variant="outline" className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> RBAC Enabled
              </Badge>
            </CardFooter>
          </Card>
        </motion.div>

        {/* Social Login */}
        <motion.div variants={cardVariants} className="md:col-span-2 lg:col-span-2" whileHover={{ y: -8, transition: { duration: 0.2 } }}>
          <Card className="flex flex-col h-full border-primary/10 shadow-sm hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle>Single Sign-On (OAuth2)</CardTitle>
              <CardDescription>Frictionless onboarding with third-party providers</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-center">
              <p className="text-sm text-muted-foreground mb-6 max-w-xl leading-relaxed">
                Allow users to bypass traditional registration by securely logging in with their existing trusted accounts. Handled seamlessly via Spring Security OAuth2.
              </p>
              <div className="flex flex-wrap gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" className="flex items-center gap-2 border-primary/20">
                    <SiGoogle className="w-4 h-4 text-red-500" />
                    Google Login
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" className="flex items-center gap-2 border-primary/20">
                    <SiGithub className="w-4 h-4" />
                    GitHub Login
                  </Button>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Future Integrations */}
        <motion.div variants={cardVariants} whileHover={{ y: -8, transition: { duration: 0.2 } }}>
          <Card className="flex flex-col h-full bg-muted/30 border-dashed border-2 transition-all duration-300 hover:border-primary/40">
            <CardHeader>
              <CardTitle className="text-muted-foreground flex items-center gap-2">
                Upcoming Integrations
              </CardTitle>
              <CardDescription>Roadmap features</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                We are actively expanding our identity provider network. More social login options will be available in future updates.
              </p>
              <div className="space-y-3">
                <motion.div 
                  whileHover={{ x: 4 }}
                  className="flex items-center justify-between p-3 border rounded-lg bg-background/50 opacity-70 hover:opacity-100 transition-opacity"
                >
                  <div className="flex items-center gap-2">
                    <LinkedinIcon className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium">LinkedIn</span>
                  </div>
                  <Badge variant="outline" className="text-[10px]">Coming Soon</Badge>
                </motion.div>
                <motion.div 
                  whileHover={{ x: 4 }}
                  className="flex items-center justify-between p-3 border rounded-lg bg-background/50 opacity-70 hover:opacity-100 transition-opacity"
                >
                  <div className="flex items-center gap-2">
                    <SiFacebook className="w-5 h-5 text-blue-500" />
                    <span className="text-sm font-medium">Facebook</span>
                  </div>
                  <Badge variant="outline" className="text-[10px]">Coming Soon</Badge>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

      </motion.div>

      {/* CTA Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-16 text-center"
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
          <Button size="lg" className="group px-8 shadow-lg shadow-primary/20">
            Explore Developer Docs 
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1.5" />
          </Button>
        </motion.div>
      </motion.div>

    </div>
  )
}