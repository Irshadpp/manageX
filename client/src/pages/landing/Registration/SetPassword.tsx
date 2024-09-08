import Managex from '@/components/ui/Managex'
import React from 'react'
import { Button } from 'react-day-picker'
import SetPasswordForm from './SetPasswordForm'

const SetPassword = () => {
  return (
    <div className="flex h-screen items-center justify-center p-4">
    <div className="flex flex-col items-center shadow-[0_0_30px_rgba(0,0,0,0.35)] rounded-lg w-full max-w-md bg-card p-5 sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12">
      <div className="p-1 space-y-3 flex flex-col items-center text-center">
        <div className="flex">
        <h1 className="text-3xl font-bold">Welcome to</h1>
          <h3 className="text-3xl font-bold ml-2">
            <Managex />
          </h3>
        </div>
        <div className='space-y-3'>
          <>
          <h5 className="text-xl font-semibold">Create New Password</h5>
          <SetPasswordForm/>
          </>
        </div>
      </div>
    </div>
  </div>
  )
}

export default SetPassword
