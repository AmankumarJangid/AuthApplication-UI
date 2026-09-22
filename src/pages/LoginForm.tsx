import React from 'react'
import { LoginForm } from '@/components/login-form'
import { motion } from 'motion/react'

const LoginPanel = () => {
  return (
      <div className=' w-full fixed grid grid-cols-1 h-full overflow-auto   md:grid-cols-2 '>
        <div className='w-full maxh-h-full max-w-full flex flex-col justify-center items-center-safe px-10 border-r border-dashed'>
          <motion.div className='max-w-lg  md:w-full  border p-10 rounded-2xl shadow-2xl shadow-chart-5 '
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <LoginForm/>
          </motion.div>
        </div>
        <div className="hidden md:min-w-1/2" id="login-left-panel"> </div>
  
      </div>
    )
}

export default LoginPanel
