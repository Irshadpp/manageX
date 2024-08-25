import { GoogleLogin } from '@react-oauth/google'
import React from 'react'

const 
GoogleAuth = () => {
  return (
    <div className='flex justify-center items-center pt-8'>
      <GoogleLogin
  onSuccess={credentialResponse => {
    console.log(credentialResponse);
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>
    </div>
  )
}

export default GoogleAuth
