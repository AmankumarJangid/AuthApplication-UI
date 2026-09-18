import React from 'react'
import { LoginForm } from '@/components/login-form'

const LoginPanel = () => {
  return (
      <div className=' w-full fixed grid grid-cols-1 h-full overflow-auto   md:grid-cols-2 '>
        <div className='w-full maxh-h-full max-w-full flex flex-col justify-center items-center-safe px-10 border-r border-dashed'>
          <div className='max-w-lg  md:w-full  border p-10 rounded-2xl shadow-2xl shadow-chart-5 '>
            <LoginForm/>
          </div>
        </div>
        <div className="hidden md:min-w-1/2" id="login-left-panel"> </div>
  
      </div>
    )
}

export default LoginPanel
