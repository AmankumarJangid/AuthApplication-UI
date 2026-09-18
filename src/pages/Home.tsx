import { LoginForm } from '@/components/login-form'
import SecurityFeaturesUI from '@/components/SecurityFeatureUI'
import { SignupForm } from '@/components/signup-form'
import { Badge } from '@/components/ui/badge'
import { motion } from 'motion/react'
import React from 'react'
import './styling/home.css'

const Home = () => {
  return (
    <div className='w-full  flex flex-col  justify-center items-center-safe mt-10 text-center'>
      {/* Hero Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="flex flex-col items-center gap-3 max-w-2xl px-4"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          <Badge variant="outline" className="font-bold border-primary/40 px-3 py-1 text-sm bg-primary/5">
            Authentication Application
          </Badge>
        </motion.div>

        <motion.h1
          className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-foreground via-foreground/80 to-muted-foreground bg-clip-text text-transparent"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Classic Solution for Modern Authentication
        </motion.h1>

        <motion.p
          className="font-bold text-primary/80 tracking-wide text-sm md:text-base flex items-center gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <span>⚡</span> By Aman Jangid <span>⚡</span>
        </motion.p>
      </motion.div>

      {/* Cards Section */}
      <div className="marquee-wrapper">

        <div className='tap1-wrapper'>
          <div className="security-tape"></div>
        </div>
        <div className='tap2-wrapper'>
          <div className="security-tape"></div>
        </div>

        <div className="content-layer w-full grid grid-cols-2 justify-items-center items-center h-full overflow-y-hidden overflow-x-hidden p-4 m-auto sm:p-4 [perspective:1000px]">


          {/* Login Card */}
          <motion.div
            className="select-none w-full max-w-lg border p-4 sm:p-6 md:p-10 rounded-2xl shadow-xl md:shadow-2xl shadow-chart-5/30 bg-background transition-all duration-500 ease-out [transform-style:preserve-3d] [transform:scale(0.85)_translateX(25%)_rotateY(14deg)] sm:[transform:scale(0.8)_translateX(20%)_rotateY(12deg)_rotateX(5deg)] hover:[transform:scale(1.05)_translateX(0%)_rotateY(0deg)_rotateX(0deg)] active:[transform:scale(1.05)_translateX(0%)_rotateY(0deg)_rotateX(0deg)] hover:shadow-chart-5/60 hover:z-30 active:z-30 cursor-pointer justify-self-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.8, ease: 'easeOut' }}
            >
              <div
                className="[transform:translateZ(20px)] sm:[transform:translateZ(30px)]"
              >
                <LoginForm isDecorative={true}/>
              </div>
            </motion.div>
          </motion.div>

          {/* Signup Card */}
          <motion.div
            className="select-none w-full max-w-lg border p-4 sm:p-6 md:p-10 rounded-2xl shadow-xl md:shadow-2xl shadow-chart-5/30 bg-background transition-all duration-500 ease-out [transform-style:preserve-3d] [transform:scale(0.85)_translateX(-25%)_rotateY(-14deg)] sm:[transform:scale(0.8)_translateX(-20%)_rotateY(-12deg)_rotateX(5deg)] hover:[transform:scale(1.05)_translateX(0%)_rotateY(0deg)_rotateX(0deg)] active:[transform:scale(1.05)_translateX(0%)_rotateY(0deg)_rotateX(0deg)] hover:shadow-chart-5/60 hover:z-30 active:z-30 cursor-pointer justify-self-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.7 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
            >
              <div

                className="[transform:translateZ(20px)] sm:[transform:translateZ(30px)]"
              >
                <SignupForm isDecorative = {true}/>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>


      <section>
        <SecurityFeaturesUI />
      </section>
    </div>
  )
}

export default Home
