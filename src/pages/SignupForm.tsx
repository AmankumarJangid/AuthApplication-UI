import { SignupForm } from '@/components/signup-form'
import React from 'react'

const SignupPanel = () => {
  return (
    <div className='w-full  fixed grid grid-cols-1 justify-items-center h-full overflow-auto   lg:grid-cols-2 '>
      <div className=" hidden md:min-w-1/2 w-full h-full col-start-1 col-end-2" id="signup-left-panel"> </div>
      <div className='col-start-1 w-full max-w-full min-h-full flex flex-col justify-center items-center-safe px-10 border-l border-dashed lg:col-start-2'>
        <div className='w-full max-w-lg border p-10 rounded-2xl shadow-2xl shadow-chart-5'>
          <SignupForm/> 
        </div>
      </div>

    </div>
  )
}

export default SignupPanel